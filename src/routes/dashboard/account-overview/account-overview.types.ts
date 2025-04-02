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
  columnTitle: string;
}

export interface AccountOverviewCardFormProps {
  amount: number;
}
