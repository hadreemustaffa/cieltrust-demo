export interface Transaction {
  type: 'income' | 'expenses';
  id: number | null;
  transaction_date: string;
  from: string;
  budget: string;
  category: string;
  amount: number;
  reference?: string;
}
