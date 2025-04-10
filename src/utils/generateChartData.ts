import dayjs from 'dayjs';

import { TimePeriod, VisualChartProps } from '@/routes/dashboard/visual-chart/visual-chart.types';

export const generateChartData = ({ data }: VisualChartProps, selectedDate: dayjs.Dayjs, period: TimePeriod) => {
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;
  let labels: string[] = [];

  switch (period) {
    case '1M':
      startDate = selectedDate.startOf('month');
      endDate = selectedDate.endOf('month');
      labels = Array.from({ length: dayjs(endDate).diff(startDate, 'day') + 1 }, (_, i) =>
        startDate.add(i, 'day').format('YYYY-MM-DD'),
      );
      break;
    case '6M':
      startDate = selectedDate.subtract(5, 'month').startOf('month');
      endDate = selectedDate.endOf('month');
      labels = Array.from({ length: 6 }, (_, i) => startDate.add(i, 'month').format('YYYY-MM'));
      break;
    case '1Y':
      startDate = selectedDate.subtract(1, 'year').startOf('month');
      endDate = selectedDate.endOf('month');
      labels = Array.from({ length: 13 }, (_, i) => startDate.add(i, 'month').format('YYYY-MM'));
      break;
    case 'YTD':
      startDate = dayjs().startOf('year');
      endDate = dayjs();
      labels = Array.from({ length: dayjs(endDate).diff(startDate, 'month') + 1 }, (_, i) =>
        startDate.add(i, 'month').format('YYYY-MM'),
      );
      break;
  }

  const expensesData = labels.map((label) => {
    const periodStart = period === '1M' ? dayjs(label) : dayjs(label + '-01');

    const periodEnd = period === '1M' ? dayjs(label) : periodStart.endOf('month');

    return data
      .filter(
        (transaction) =>
          transaction.type === 'expenses' &&
          dayjs(transaction.transaction_date).isBetween(periodStart.subtract(1, 'day'), periodEnd, null, '[]'),
      )
      .reduce((acc, cur) => acc + cur.amount, 0);
  });

  const incomeData = labels.map((label) => {
    const periodStart = period === '1M' ? dayjs(label) : dayjs(label + '-01');

    const periodEnd = period === '1M' ? dayjs(label) : periodStart.endOf('month');

    return data
      .filter(
        (transaction) =>
          transaction.type === 'income' &&
          dayjs(transaction.transaction_date).isBetween(periodStart.subtract(1, 'day'), periodEnd, null, '[]'),
      )
      .reduce((acc, cur) => acc + cur.amount, 0);
  });

  return { labels, expensesData, incomeData };
};
