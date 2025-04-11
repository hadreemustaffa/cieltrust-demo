import React, { createContext, useContext } from 'react';

import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';

export interface TransactionHistoryContextProps {
  history: Transaction[];
  setHistory: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const TransactionHistoryContext = createContext<TransactionHistoryContextProps | undefined>(undefined);

export const useTransactionHistory = (): TransactionHistoryContextProps => {
  const context = useContext(TransactionHistoryContext);
  if (!context) {
    throw new Error('useBudgetTables must be used within an BudgetTablesProvider');
  }
  return context;
};
