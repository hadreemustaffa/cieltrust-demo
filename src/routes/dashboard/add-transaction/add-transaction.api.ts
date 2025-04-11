import React from 'react';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import { ExpensesFormData, FormData, IncomeFormData } from '@/routes/dashboard/add-transaction/add-transaction.types';
import { Category, Table } from '@/routes/dashboard/budget/budget.types';
import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';
import supabase from '@/utils/supabase';

interface AddTransactionProps {
  dashboardId: number | null;
  budgetTables: Table[];
  setBudgetTables: React.Dispatch<React.SetStateAction<Table[]>>;
  setOverview: React.Dispatch<React.SetStateAction<Overview>>;
  setHistory: React.Dispatch<React.SetStateAction<Transaction[]>>;
  transactionType: FormData['transactionType'];
  date: FormData['date'];
  from: IncomeFormData['from'];
  savings: IncomeFormData['savings'];
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
  setOverview,
  setHistory,
  date,
  from,
  savings,
  amount,
  reference,
  budget,
  category,
}: AddTransactionProps) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          dashboard_id: dashboardId,
          type: transactionType,
          transaction_date: date,
          from_source: from,
          savings: savings,
          amount: amount,
          reference: reference,
          budget: budget,
          category: category,
        },
      ])
      .select()
      .single();

    if (data) {
      if (transactionType === 'income') {
        setOverview((prevOverview) => ({
          ...prevOverview,
          balance: prevOverview.balance + Number(amount) - (Number(savings) / 100) * Number(amount),
          income: prevOverview.income + Number(amount),
          savings: prevOverview.savings + (Number(savings) / 100) * Number(amount),
        }));

        setHistory((prevHistory) => [
          ...prevHistory,
          {
            type: 'income',
            id: data.id,
            transaction_date: date,
            from_source: from,
            savings: Number(savings),
            amount: Number(amount),
            reference: reference,
          },
        ]);
      }

      if (transactionType === 'expenses') {
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

        setOverview((prevOverview) => ({
          ...prevOverview,
          balance: prevOverview.balance - Number(amount),
          expenses: prevOverview.expenses + Number(amount),
        }));

        if (budget && category) {
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              type: 'expenses',
              id: data.id,
              transaction_date: date,
              budget: budget,
              category: category,
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
