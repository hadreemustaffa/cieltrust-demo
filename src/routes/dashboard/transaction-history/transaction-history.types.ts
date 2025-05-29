import React from 'react';

export type TransactionType = 'income' | 'expenses';

export type Transaction = {
  type: TransactionType;
  id: number;
  transaction_date: string;
  budget: string;
  category: string;
  amount: number;
  reference: string;
  from: string;
  savings: number;
};

export interface TransactionsListProps {
  isFetching: boolean;
  transactionType: TransactionType;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentTransactions: Transaction[];
  handleClose: () => void;
}

export interface TransactionListItemProps {
  transaction: Transaction;
  checkedTransactions: { [key: string]: boolean };
  handleCheckTransaction: (id: string, checked: boolean) => void;
}

export type TransactionHistory = {
  history: Transaction[];
  count?: number;
  limit?: number;
  page?: number;
};

export type GetPaginatedTransactionHistory = {
  dashboardId: number | null;
  type?: TransactionType;
  page?: number;
  limit?: number;
};

export interface DeleteTransactionHistory {
  id: number[];
}
