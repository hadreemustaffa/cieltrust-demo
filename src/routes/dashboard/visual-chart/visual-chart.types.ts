import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';

export const PERIODS = ['1M', '6M', '1Y', 'YTD'] as const;

export type TimePeriod = (typeof PERIODS)[number];

export interface VisualChartProps {
  data: Transaction[];
}
