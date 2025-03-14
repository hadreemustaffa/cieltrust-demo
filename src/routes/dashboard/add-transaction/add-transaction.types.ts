export interface FormProps {
  name: 'income' | 'expenses';
}

export interface FormData {
  name: FormProps['name'];
  amount: number;
  id: number | null;
  date: string;
}

export interface IncomeFormData {
  from: string;
  amount: number;
  reference?: string;
}

export interface ExpensesFormData {
  budget: string;
  category: string;
  amount: number;
  reference?: string;
}
