export interface FormData {
  transactionType: 'income' | 'expenses';
  id: number;
  date: string;
  reference?: string;
}

export interface IncomeFormData {
  from: string;
  amount: number;
  percent_saved?: number;
}

export interface ExpensesFormData {
  budget_id?: number;
  category_id?: number;
  amount: number;
}
