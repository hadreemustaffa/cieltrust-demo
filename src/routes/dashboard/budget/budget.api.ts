import React from 'react';

import supabase from '@/utils/supabase';

import { AddBudgetTableFormData, Table } from '@/routes/dashboard/budget/budget.types';

export const addBudgetTable = async ({
  id,
  name,
  amount,
  addCategories,
  setBudgetTablesProvider,
}: AddBudgetTableFormData & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
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
