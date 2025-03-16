import React from 'react';

import { ExpensesFormData, FormData, IncomeFormData } from '@/routes/dashboard/add-transaction/add-transaction.types';
import { Category, Table } from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

interface AddTransactionProps {
  dashboardId: number | null;
  budgetTables: Table[];
  setBudgetTables: React.Dispatch<React.SetStateAction<Table[]>>;
  transactionType: FormData['transactionType'];
  date: FormData['date'];
  from: IncomeFormData['from'];
  amount: IncomeFormData['amount'] | ExpensesFormData['amount'];
  reference?: FormData['reference'];
  budget?: ExpensesFormData['budget'];
  category?: ExpensesFormData['category'];
}

export const addTransaction = async ({
  dashboardId,
  transactionType,
  budgetTables,
  setBudgetTables,
  date,
  from,
  amount,
  reference,
  budget,
  category,
}: AddTransactionProps) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          dashboard_id: dashboardId,
          type: transactionType,
          transaction_date: date,
          from_source: from,
          amount: amount,
          reference: reference,
          budget: budget,
          category: category,
        },
      ])
      .select()
      .single();

    if (category) {
      const foundCategory = budgetTables
        .flatMap((table: Table) => table.budget_categories)
        .find((cat: Category) => cat.name === category);

      const categoryId = foundCategory?.id;
      const categorySpent = Number(foundCategory?.spent || 0);
      const newAmount = Number(amount);

      const { error: categoryError } = await supabase
        .from('budget_categories')
        .update({
          spent: categorySpent + newAmount,
        })
        .eq('id', categoryId)
        .select();

      setBudgetTables(
        budgetTables.map((table) => ({
          ...table,
          budget_categories: table.budget_categories.flatMap((cat) =>
            cat.id === categoryId ? [{ ...cat, spent: Number(cat.spent || 0) + newAmount }] : [cat],
          ),
        })),
      );

      if (categoryError) {
        console.log('Error updating category:', categoryError);
        throw categoryError;
      }
    }

    if (error) {
      console.log('Error inserting transaction:', error);
      throw error;
    }
  } catch (error) {
    console.log('Error inserting transaction:', error);
  }
};
