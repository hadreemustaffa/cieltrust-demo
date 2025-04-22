import React from 'react';

import { Table } from '@/routes/dashboard/budget/budget.types';
import {
  AddUpcomingPaymentFormProps,
  DeleteUpcomingPaymentProps,
  EditUpcomingPaymentFormProps,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';
import supabase from '@/utils/supabase';

export const addUpcomingPayment = async ({
  id,
  name,
  amount,
  recurrence,
  start_date,
  setBudgetTablesProvider,
}: AddUpcomingPaymentFormProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .insert({
        dashboard_id: id,
        name: name,
        amount: amount,
        is_recurring: true,
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .single();

    if (budgetError) {
      console.log('Error inserting budget:', budgetError);
      throw budgetError;
    }

    if (budgetData) {
      const newBudgetTable = {
        id: budgetData.id,
        name: budgetData.name,
        budget_categories: [],
        amount: budgetData.amount,
        remaining: budgetData.amount,
        is_recurring: true,
        recurrence: budgetData.recurrence,
        start_date: budgetData.start_date,
      };

      setBudgetTablesProvider((prevTables) => [...prevTables, newBudgetTable]);
    }
  } catch (error) {
    console.error('Error inserting budget and categories:', error);
  }
};

export const editUpcomingPayment = async ({
  id,
  name,
  amount,
  recurrence,
  start_date,
  setBudgetTablesProvider,
}: EditUpcomingPaymentFormProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .update({
        name: name,
        amount: amount,
        is_recurring: true,
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .eq('id', id);

    if (budgetError) {
      console.log('Error updating budget:', budgetError);
      throw budgetError;
    }

    if (budgetData) {
      setBudgetTablesProvider((prevTables) =>
        prevTables.map((table) =>
          table.id === id
            ? {
                ...table,
                name: name,
                amount: amount,
                is_recurring: true,
                recurrence: recurrence,
                start_date: start_date,
                budget_categories: [],
              }
            : table,
        ),
      );
    }
  } catch (error) {
    console.error('Error updating budget:', error);
  }
};

export const deleteUpcomingPayment = async ({
  id,
  setBudgetTablesProvider,
}: DeleteUpcomingPaymentProps & { setBudgetTablesProvider: React.Dispatch<React.SetStateAction<Table[]>> }) => {
  try {
    await supabase.from('budget').delete().eq('id', id);
    setBudgetTablesProvider((prevTables) => prevTables.filter((table) => table.id !== id));
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
