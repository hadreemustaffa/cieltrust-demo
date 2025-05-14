import React from 'react';

import {
  AddBudgetFormProps,
  Category,
  DeleteBudgetTableProps,
  EditBudgetFormProps,
  Table,
} from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

export const addBudgetTable = async ({
  id,
  name,
  amount,
  addCategories,
  setBudgetTablesProvider,
}: AddBudgetFormProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .insert({
        dashboard_id: id,
        name: name,
        amount: amount,
      })
      .select()
      .single();

    if (budgetError) {
      console.log('Error inserting budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (addCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.id);

    const { data: categoryData, error: categoryError } = await supabase
      .from('budget_categories')
      .insert(
        addCategories
          ?.filter((category) => selectedCategories.includes(category.id))
          .map((category) => ({
            budget_id: budgetData.id,
            category_id: category.id,
          })),
      )
      .select();

    if (categoryError) {
      console.log('Error inserting categories:', categoryError);
      throw categoryError;
    }

    if (budgetData) {
      const newBudgetTable = {
        id: budgetData.id,
        name: budgetData.name,
        budget_categories: categoryData,
        amount: budgetData.amount,
        remaining: budgetData.amount,
      };

      setBudgetTablesProvider((prevTables) => [...prevTables, newBudgetTable]);
    }
  } catch (error) {
    console.error('Error inserting budget and categories:', error);
  }
};

export const editBudgetTable = async ({
  id,
  name,
  amount,
  editCategories,
  state,
  setBudgetTablesProvider,
}: EditBudgetFormProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .update({
        name: name,
        amount: amount,
      })
      .select()
      .eq('id', id);

    if (budgetError) {
      console.log('Error updating budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (editCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.id);

    const tableCategories = (state ?? [])
      .filter((table) => table.id === id)
      .flatMap((table) => table.budget_categories.map((category) => category.category_id));

    const newCategoriesMap = selectedCategories
      .filter((category) => !tableCategories?.includes(category))
      .map((category) => ({
        budget_id: id,
        category_id: category,
        amount: 0,
        spent: 0,
      }));

    const { data: categoryData, error: categoryError } = await supabase
      .from('budget_categories')
      .insert(newCategoriesMap)
      .select();

    if (categoryError) {
      console.log('Error updating categories:', categoryError);
      throw categoryError;
    }

    const removedCategories = tableCategories
      .filter((category) => !selectedCategories.includes(category))
      .map((category) => ({
        category_id: category,
      }));

    const { error: removeError } = await supabase
      .from('budget_categories')
      .delete()
      .in(
        'category_id',
        removedCategories.map((category) => category.category_id),
      )
      .eq('budget_id', id);

    if (removeError) {
      console.log('Error removing categories:', removeError);
      throw removeError;
    }

    if (budgetData) {
      setBudgetTablesProvider((prevTables) =>
        prevTables.map((table) =>
          table.id === id
            ? {
                ...table,
                name: name,
                amount: amount,
                budget_categories: [
                  ...table.budget_categories.filter(
                    (category) => !removedCategories.some((removed) => removed.category_id === category.category_id),
                  ),
                  ...categoryData.map((newCategory: Category) => ({
                    ...newCategory,
                  })),
                ],
              }
            : table,
        ),
      );
    }
  } catch (error) {
    console.error('Error updating budget:', error);
  }
};

export const deleteBudgetTable = async ({
  id,
  setBudgetTablesProvider,
}: DeleteBudgetTableProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    await supabase.from('budget').delete().eq('id', id);
    setBudgetTablesProvider((prevTables) => prevTables.filter((table) => table.id !== id));
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
