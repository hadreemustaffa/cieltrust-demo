export interface Transaction {
  type: 'income' | 'expenses';
  id: number | null;
  transaction_date: string;
  from_source: string;
  budget: string;
  category: string;
  amount: number;
  reference?: string;
}

export interface TransactionHistoryProps {
  data: Transaction[];
}

export interface DeleteTransactionHistoryProps {
  id: string[];
}
