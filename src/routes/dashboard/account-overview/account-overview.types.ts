type ColumnTitle = 'balance' | 'income' | 'expenses' | 'savings';

export type Overview = {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  previous_month: {
    balance: number;
    income: number;
    expenses: number;
    savings: number;
  };
};

export interface AccountOverviewCardProps {
  amount: number;
  lastMonthAmount: number;
  columnTitle: ColumnTitle;
  hasTooltip?: boolean;
}

export interface AccountOverviewCardFormProps {
  amount: number;
}
