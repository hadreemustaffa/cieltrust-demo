import React from 'react';

import supabase from '@/utils/supabase';

import {
  DeleteTransactionHistoryProps,
  Transaction,
} from '@/routes/dashboard/transaction-history/transaction-history.types';

export const getTransactionHistory = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<Transaction[]>>;
}) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false });

  if (data) {
    setState(data);
  }

  if (error) {
    console.error('Error fetching transaction history:', error);
  }
};

export const deleteTransactionHistory = async ({ id }: DeleteTransactionHistoryProps) => {
  const { error } = await supabase.from('transactions').delete().in('id', id);

  if (error) {
    console.log('Error deleting transactions:', error);
  }
};
