import React from 'react';

import supabase from '@/utils/supabase';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import { ExpensesFormData, FormData, IncomeFormData } from '@/routes/dashboard/add-transaction/add-transaction.types';
import { Table } from '@/routes/dashboard/budget/budget.types';
import { Categories } from '@/routes/dashboard/categories/categories.types';
import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';

interface AddTransactionProps {
  dashboardId: number | null;
  budgetTables: Table[];
  categories: Categories;
  setBudgetTables: React.Dispatch<React.SetStateAction<Table[]>>;
  setOverview: React.Dispatch<React.SetStateAction<Overview>>;
  setHistory: React.Dispatch<React.SetStateAction<Transaction[]>>;
  transactionType: FormData['transactionType'];
  date: FormData['date'];
  from: IncomeFormData['from'];
  percent_saved: IncomeFormData['percent_saved'];
  amount: IncomeFormData['amount'] | ExpensesFormData['amount'];
  reference?: FormData['reference'];
  budget_id?: ExpensesFormData['budget_id'];
  category_id?: ExpensesFormData['category_id'];
}

export const addTransaction = async ({
  dashboardId,
  transactionType,
  budgetTables,
  categories,
  setBudgetTables,
  setOverview,
  setHistory,
  date,
  from,
  percent_saved,
  amount,
  reference,
  budget_id,
  category_id,
}: AddTransactionProps) => {
  const budgetTableName = budgetTables.find((table) => table.id === Number(budget_id))?.name;
  const categoryName = categories.find((cat) => cat.id === Number(category_id))?.name;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          dashboard_id: dashboardId,
          type: transactionType,
          transaction_date: date,
          from: from,
          percent_saved: percent_saved,
          amount: amount,
          reference: reference,
          budget: budgetTableName,
          category: categoryName,
        },
      ])
      .select()
      .single();

    if (data) {
      if (transactionType === 'income') {
        setOverview((prevOverview) => ({
          ...prevOverview,
          balance: prevOverview.balance + Number(amount) - (Number(percent_saved) / 100) * Number(amount),
          income: prevOverview.income + Number(amount),
          savings: prevOverview.savings + (Number(percent_saved) / 100) * Number(amount),
        }));

        setHistory((prevHistory) => [
          ...prevHistory,
          {
            type: 'income',
            id: data.id,
            transaction_date: date,
            from: from,
            savings: Number(percent_saved),
            amount: Number(amount),
            reference: reference,
          },
        ]);
      }

      if (transactionType === 'expenses') {
        const foundTable = budgetTables.find((table) => table.id === Number(budget_id));
        const foundCategory = foundTable?.budget_categories.find((cat) => cat.category_id === Number(category_id));
        const categoryId = foundCategory?.category_id;
        const categorySpent = Number(foundCategory?.spent || 0);
        const newAmount = Number(amount);

        const { error: categoryError } = await supabase
          .from('budget_categories')
          .update({
            spent: categorySpent + newAmount,
          })
          .eq('category_id', categoryId)
          .select();

        setBudgetTables(
          budgetTables.map((table) => ({
            ...table,
            budget_categories: table.budget_categories.map((cat) => {
              if (cat.category_id === categoryId) {
                return {
                  ...cat,
                  spent: Number(cat.spent) + newAmount,
                };
              }
              return cat;
            }),
          })),
        );

        setOverview((prevOverview) => ({
          ...prevOverview,
          balance: prevOverview.balance - Number(amount),
          expenses: prevOverview.expenses + Number(amount),
        }));

        if (budget_id && category_id) {
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              type: 'expenses',
              id: data.id,
              transaction_date: date,
              budget: budgetTableName || '',
              category: categoryName || '',
              amount: Number(amount),
              reference: reference,
            },
          ]);
        }

        if (categoryError) {
          console.log('Error updating category:', categoryError);
          throw categoryError;
        }
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
