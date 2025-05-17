import React from 'react';

import supabase from '@/utils/supabase';

import { DeleteBudgetTableData, EditBudgetTableFormData, Table } from '@/routes/dashboard/budget/budget.types';
import { Category } from '@/routes/dashboard/categories/categories.types';

export const editBudgetTable = async ({
  id,
  name,
  amount,
  editCategories,
  state,
  setBudgetTablesProvider,
}: EditBudgetTableFormData & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
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
}: DeleteBudgetTableData & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    await supabase.from('budget').delete().eq('id', id);
    setBudgetTablesProvider((prevTables) => prevTables.filter((table) => table.id !== id));
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
