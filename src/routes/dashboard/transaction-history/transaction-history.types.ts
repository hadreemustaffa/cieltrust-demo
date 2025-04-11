export type Transaction =
  | {
      type: 'income';
      id: number | null;
      transaction_date: string;
      from_source: string;
      savings: number;
      amount: number;
      reference?: string;
    }
  | {
      type: 'expenses';
      id: number | null;
      transaction_date: string;
      budget: string;
      category: string;
      amount: number;
      reference?: string;
    };

export interface DeleteTransactionHistoryProps {
  id: string[];
}
