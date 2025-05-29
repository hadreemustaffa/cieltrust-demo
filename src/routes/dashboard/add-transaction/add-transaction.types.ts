export type AddTransactionFormData = AddTransactionIncomeFormData & AddTransactionExpensesFormData;

export interface AddTransactionIncomeFormData {
  dashboard_id: number;
  transaction_date: string;
  from: string;
  amount: number;
  percent_saved: number;
  reference: string;
}

export interface AddTransactionExpensesFormData {
  dashboard_id: number;
  transaction_date: string;
  budget: string;
  category: string;
  amount: number;
  reference: string;
}
