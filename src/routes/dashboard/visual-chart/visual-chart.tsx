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
import { useTransactionHistory } from '@/hooks/use-transaction-history';
import { PERIODS, TimePeriod } from '@/routes/dashboard/visual-chart/visual-chart.types';
import { generateChartData } from '@/utils/generateChartData';

dayjs.extend(isBetween);

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function VisualChart() {
  const [chartConfig, setChartConfig] = useState({
    period: '6M' as TimePeriod,
    date: dayjs(),
    year: dayjs().year(),
  });

  const { history } = useTransactionHistory();

  const { availableMonths, availableYears, currentMonth, currentYear } = useMemo(() => {
    const months = Array.from(
      new Set(history.map((transaction) => dayjs(transaction.transaction_date).format('YYYY-MM'))),
    ).sort();

    const years = Array.from(new Set(history.map((transaction) => dayjs(transaction.transaction_date).year()))).sort();

    return {
      availableMonths: months,
      availableYears: years,
      currentMonth: months.find((month) => dayjs().format('YYYY-MM') === month),
      currentYear: years.find((year) => dayjs().year() === year),
    };
  }, [history]);

  const availableMonthsByYear = useMemo(
    () => availableMonths.filter((month) => dayjs(month).year() === chartConfig.year),
    [availableMonths, chartConfig.year],
  );

  const chartState = useMemo(
    () => generateChartData(history, chartConfig.date, chartConfig.period),
    [history, chartConfig.date, chartConfig.period],
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        intersect: false,
        mode: 'index' as const,
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
          text: `Time Period (${chartConfig.period})`,
        },
      },
    },
  };

  const formatChartLabels = (labels: string[]) => {
    if (chartConfig.period === '1M') return labels;

    return labels.map((label) => {
      const date = dayjs(label + '-01');
      switch (chartConfig.period) {
        case '6M':
        case '1Y':
          return date.format('MMM YYYY');
        case 'YTD':
          return date.format('MMM');
        default:
          return label;
      }
    });
  };

  const chartData = {
    labels: formatChartLabels(chartState.labels),
    datasets: [
      {
        label: 'Income',
        data: chartState.incomeData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: chartState.expensesData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      },
    ],
  };

  const handlePeriodChange = (period: TimePeriod) => {
    setChartConfig((prev) => ({ ...prev, period }));
  };

  const handleMonthChange = (monthStr: string) => {
    const newDate = dayjs(monthStr + '-01');
    setChartConfig((prev) => ({ ...prev, date: newDate }));
  };

  const handleYearChange = (yearStr: string) => {
    const newYear = parseInt(yearStr, 10);
    const monthsInYear = availableMonths.filter((month) => dayjs(month).year() === newYear);
    const newDate = dayjs(monthsInYear[0] + '-01');

    setChartConfig((prev) => ({
      ...prev,
      year: newYear,
      date: newDate,
    }));
  };

  const hasData = history.length > 0;

  return (
    <div className="flex items-center justify-center rounded-md border border-accent/10 p-4 md:col-span-full lg:col-span-2">
      <div className="flex w-full flex-col gap-4">
        {!hasData && <div className="py-8 text-center text-gray-500">No transaction data available to display</div>}

        {hasData && (
          <>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <div className="flex flex-row flex-wrap items-center gap-2">
                {PERIODS.map((period) => (
                  <ButtonSecondary
                    key={period}
                    className={`${chartConfig.period === period ? 'bg-accent/10' : ''}`}
                    onClick={() => handlePeriodChange(period)}
                    aria-pressed={chartConfig.period === period}
                  >
                    {period}
                  </ButtonSecondary>
                ))}
              </div>

              {availableMonths.length > 0 && chartConfig.period !== 'YTD' && (
                <div className="flex flex-wrap items-center gap-2">
                  <label htmlFor="selectMonth" className="sr-only">
                    Select Month
                  </label>
                  <select
                    id="selectMonth"
                    value={chartConfig.date.format('YYYY-MM')}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className="rounded border border-accent/30 bg-card p-2 hover:cursor-pointer hover:border-accent/50"
                    aria-label="Select month"
                  >
                    {availableMonthsByYear.map((month) => (
                      <option key={month} value={month}>
                        {dayjs(month + '-01').format('MMMM')}
                      </option>
                    ))}
                    {currentMonth === undefined && chartConfig.year === dayjs().year() && (
                      <option value={dayjs().format('YYYY-MM')}>{dayjs().format('MMMM')}</option>
                    )}
                  </select>

                  <label htmlFor="selectYear" className="sr-only">
                    Select Year
                  </label>
                  <select
                    id="selectYear"
                    value={chartConfig.year}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="rounded border border-accent/30 bg-card p-2 hover:cursor-pointer hover:border-accent/50"
                    aria-label="Select year"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                    {currentYear === undefined && <option value={dayjs().year()}>{dayjs().year()}</option>}
                  </select>
                </div>
              )}
            </div>

            <Line data={chartData} options={options} />
          </>
        )}
      </div>
    </div>
  );
}
