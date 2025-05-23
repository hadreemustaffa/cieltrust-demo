import React from 'react';

export type Transaction =
  | {
      type: 'income';
      id: number;
      transaction_date: string;
      from: string;
      savings: number;
      amount: number;
      reference?: string;
    }
  | {
      type: 'expenses';
      id: number;
      transaction_date: string;
      budget: string;
      category: string;
      amount: number;
      reference?: string;
    };

export interface TransactionsListProps {
  isFetching: boolean;
  transactionType: Transaction['type'];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentTransactions: Transaction[];
  handleClose: () => void;
}

export interface TransactionListItemProps {
  transaction: Transaction;
  checkedTransactions: { [key: string]: boolean };
  handleCheckTransaction: (id: string, checked: boolean) => void;
}

export type TransactionHistoryItem = {
  type: Transaction['type'];
  id: number;
  transaction_date: string;
  budget: string;
  category: string;
  amount: number;
  reference: string;
  from: string;
  savings: number;
};

export type TransactionHistory = {
  history: TransactionHistoryItem[];
  count?: number;
  limit?: number;
  page?: number;
};

export type GetPaginatedTransactionHistory = {
  dashboardId: number | null;
  type?: Transaction['type'];
  page?: number;
  limit?: number;
};

export interface DeleteTransactionHistory {
  id: number[];
}
