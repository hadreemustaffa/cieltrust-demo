export interface FormProps {
  name: 'balance' | 'income' | 'expenses' | 'savings';
}

export interface FormData {
  name: FormProps['name'];
  amount: number;
  id: number | null;
}
