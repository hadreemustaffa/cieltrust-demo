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
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { ButtonSecondary } from '@/components/button';
import { PERIODS, TimePeriod, VisualChartProps } from '@/routes/dashboard/visual-chart/visual-chart.types';
import { generateChartData } from '@/utils/generateChartData';

dayjs.extend(isBetween);

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function VisualChart({ data }: VisualChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('6M');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

  const availableMonths = Array.from(
    new Set(data.map((transaction) => dayjs(transaction.transaction_date).format('YYYY-MM'))),
  ).sort();

  const currentMonth = availableMonths.find((month) => dayjs().format('YYYY-MM') === month);

  const availableYears = Array.from(
    new Set(data.map((transaction) => dayjs(transaction.transaction_date).year())),
  ).sort();

  const currentYear = availableYears.find((year) => dayjs().year() === year);

  const availableMonthsByYear = availableMonths.filter((month) => dayjs(month).year() === selectedYear);

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
        title: {
          display: true,
          text: 'Amount',
        },
      },
      x: {
        title: {
          display: true,
          text: `Time Period (${selectedPeriod})`,
        },
      },
    },
  };

  const { labels, expensesData, incomeData } = generateChartData({ data }, selectedDate, selectedPeriod);

  const chartData = {
    labels:
      selectedPeriod === '1M'
        ? labels
        : labels.map((label) =>
            selectedPeriod === '6M'
              ? dayjs(label + '-01').format('MMM YYYY')
              : selectedPeriod === 'YTD'
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
            {PERIODS.map((period) => (
              <ButtonSecondary
                key={period}
                className={`${selectedPeriod === period ? 'bg-accent/10' : ''}`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '1M' ? '1M' : period === '6M' ? '6M' : period === '1Y' ? '1Y' : 'YTD'}
              </ButtonSecondary>
            ))}
          </div>

          {availableMonths.length !== 0 && selectedPeriod !== 'YTD' && (
            <>
              <select
                id="selectMonth"
                value={selectedDate.format('YYYY-MM')}
                onChange={(e) => {
                  const newDate = dayjs(e.target.value + '-01');
                  setSelectedDate(newDate);
                }}
                className="rounded border border-accent/30 bg-card p-2 hover:cursor-pointer hover:border-accent/50"
              >
                {availableMonthsByYear.map((month) => (
                  <option key={month} value={month}>
                    {dayjs(month + '-01').format('MMMM')}
                  </option>
                ))}
                {currentMonth === undefined && selectedYear === dayjs().year() && (
                  <option value={dayjs().format('YYYY-MM')}>{dayjs().format('MMMM')}</option>
                )}
              </select>
              <select
                id="selectYear"
                value={selectedYear}
                onChange={(e) => {
                  let firstAvailableMonthByYear;
                  const newYear = parseInt(e.target.value, 10);
                  setSelectedYear(newYear);
                  const availableMonthsByYear = availableMonths.filter((month) => dayjs(month).year() === newYear);
                  if (newYear !== dayjs().year()) {
                    firstAvailableMonthByYear = dayjs(availableMonthsByYear[0]).month();
                  } else {
                    firstAvailableMonthByYear = dayjs().month();
                  }
                  const newDate = dayjs(`${newYear}-${firstAvailableMonthByYear + 1}-01`);
                  setSelectedDate(newDate);
                }}
                className="rounded border border-accent/30 bg-card p-2 hover:cursor-pointer hover:border-accent/50"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {dayjs(year + '-01').format('YYYY')}
                  </option>
                ))}
                {currentYear === undefined && <option value={dayjs().format('YYYY')}>{dayjs().format('YYYY')}</option>}
              </select>
            </>
          )}
        </div>

        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
