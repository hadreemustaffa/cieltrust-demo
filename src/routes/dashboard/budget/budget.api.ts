import React from 'react';

import {
  BudgetFormProps,
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
  recurrence,
  start_date,
  addCategories,
  fields,
  setBudgetTablesProvider,
}: BudgetFormProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .insert({
        dashboard_id: id,
        name: name,
        amount: amount,
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .single();

    if (budgetError) {
      console.log('Error inserting budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (addCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.name);

    const { data: categoryData, error: categoryError } = await supabase
      .from('budget_categories')
      .insert(
        fields
          ?.filter((category) => selectedCategories.includes(category.name))
          .map((category) => ({
            budget_id: budgetData.id,
            name: category.name,
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
        recurrence: budgetData.recurrence,
        start_date: budgetData.start_date,
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
  recurrence,
  start_date,
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
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .eq('id', id);

    if (budgetError) {
      console.log('Error updating budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (editCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.name);

    const tableCategories = (state ?? [])
      .filter((table) => table.id === id)
      .flatMap((table) => table.budget_categories.map((category) => category.name));

    const newCategoriesMap = selectedCategories
      .filter((category) => !tableCategories?.includes(category))
      .map((category) => ({
        budget_id: id,
        name: category,
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
        budget_id: id,
        name: category,
      }));

    const { error: removeError } = await supabase
      .from('budget_categories')
      .delete()
      .in(
        'name',
        removedCategories.map((category) => category.name),
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
                recurrence: recurrence,
                start_date: start_date,
                budget_categories: [
                  ...table.budget_categories.filter(
                    (category) => !removedCategories.some((removed) => removed.name === category.name),
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
