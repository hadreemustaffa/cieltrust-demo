import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { ButtonSecondary } from '@/components/button';
import { VisualChartProps } from '@/routes/dashboard/visual-chart/visual-chart.types';

dayjs.extend(isBetween);

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type TimePeriod = 'month' | '6 months' | 'year' | 'year-to-date';

export default function VisualChart({ data }: VisualChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const availableMonths = useMemo(() => {
    return Array.from(new Set(data.map((transaction) => dayjs(transaction.transaction_date).format('YYYY-MM')))).sort();
  }, [data]);

  const generateChartData = (selectedDate: dayjs.Dayjs, period: TimePeriod) => {
    let startDate: dayjs.Dayjs;
    let endDate: dayjs.Dayjs;
    let labels: string[];

    switch (period) {
      case 'month':
        startDate = selectedDate.startOf('month');
        endDate = selectedDate.endOf('month');
        labels = Array.from({ length: dayjs(endDate).diff(startDate, 'day') + 1 }, (_, i) =>
          startDate.add(i, 'day').format('YYYY-MM-DD'),
        );
        break;
      case '6 months':
        startDate = selectedDate.subtract(5, 'month').startOf('month');
        endDate = selectedDate.endOf('month');
        labels = Array.from({ length: 6 }, (_, i) => startDate.add(i, 'month').format('YYYY-MM'));
        break;
      case 'year':
        startDate = selectedDate.subtract(1, 'year').startOf('month');
        endDate = selectedDate.endOf('month');
        labels = Array.from({ length: 12 }, (_, i) => startDate.add(i, 'month').format('YYYY-MM'));
        break;
      case 'year-to-date':
        startDate = selectedDate.startOf('year');
        endDate = selectedDate;
        labels = Array.from({ length: dayjs(endDate).diff(startDate, 'month') + 1 }, (_, i) =>
          startDate.add(i, 'month').format('YYYY-MM'),
        );
        break;
    }

    const expensesData = labels.map((label) => {
      const periodStart = period === 'month' ? dayjs(label) : dayjs(label + '-01');

      const periodEnd = period === 'month' ? dayjs(label) : periodStart.endOf('month');

      return data
        .filter(
          (transaction) =>
            transaction.type === 'expenses' &&
            dayjs(transaction.transaction_date).isBetween(periodStart.subtract(1, 'day'), periodEnd, null, '[]'),
        )
        .reduce((acc, cur) => acc + cur.amount, 0);
    });

    const incomeData = labels.map((label) => {
      const periodStart = period === 'month' ? dayjs(label) : dayjs(label + '-01');

      const periodEnd = period === 'month' ? dayjs(label) : periodStart.endOf('month');

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

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: `Transactions (${selectedPeriod})`,
        },
      },
    },
  };

  const { labels, expensesData, incomeData } = generateChartData(selectedDate, selectedPeriod);

  const chartData = {
    labels:
      selectedPeriod === 'month'
        ? labels
        : labels.map((label) =>
            selectedPeriod === '6 months'
              ? dayjs(label + '-01').format('MMM YYYY')
              : selectedPeriod === 'year-to-date'
                ? dayjs(label + '-01').format('MMM')
                : dayjs(label + '-01').format('MMM YYYY'),
          ),
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center rounded-md border border-accent/10 p-4 md:col-span-full lg:col-span-2">
      <div className="flex w-full flex-col gap-4 overflow-x-scroll md:overflow-x-auto">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="flex flex-row flex-wrap items-center gap-2">
            {(['month', '6 months', 'year', 'year-to-date'] as TimePeriod[]).map((period) => (
              <ButtonSecondary
                key={period}
                className={`${selectedPeriod === period ? 'bg-accent/10' : ''}`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === 'month' ? '1M' : period === '6 months' ? '6M' : period === 'year' ? '1Y' : 'YTD'}
              </ButtonSecondary>
            ))}
          </div>

          <select
            id="selectMonth"
            value={selectedDate.format('YYYY-MM')}
            onChange={(e) => {
              const newDate = dayjs(e.target.value + '-01');
              setSelectedDate(newDate);
            }}
            className="rounded border bg-card p-2"
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {dayjs(month + '-01').format('MMMM YYYY')}
              </option>
            ))}
          </select>
        </div>

        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
