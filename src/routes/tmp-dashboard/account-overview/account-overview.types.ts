export type Overview = {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
};

export interface AccountOverviewProps {
  data: Overview;
}

export interface AccountOverviewCardProps {
  amount: number;
  columnTitle: string;
}

export interface AccountOverviewCardFormProps {
  amount: number;
}
