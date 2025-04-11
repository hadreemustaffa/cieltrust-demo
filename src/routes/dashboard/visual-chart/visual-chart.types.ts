export const PERIODS = ['1M', '6M', '1Y', 'YTD'] as const;

export type TimePeriod = (typeof PERIODS)[number];

export interface ChartDataProps {
  labels: string[];
  expensesData: number[];
  incomeData: number[];
}
