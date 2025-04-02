export interface FormData {
  transactionType: 'income' | 'expenses';
  id: number | null;
  date: string;
  reference?: string;
}

export interface IncomeFormData {
  from: string;
  amount: number;
  savings?: number;
}

export interface ExpensesFormData {
  budget: string;
  category: string;
  amount: number;
}
