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
import { Select } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import { useTransactionHistory } from '@/hooks/use-transaction-history';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import { PERIODS, TimePeriod } from '@/routes/dashboard/visual-chart/visual-chart.types';
import formatNum from '@/utils/formatNum';
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

  const staticYWidth = 32;
  const staticYWidthClass = `w-[32px]`;

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
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
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
          drwaBorder: false,
        },
      },
    },
  };

  const staticYOptions = {
    maintainAspectRatio: false,
    pointStyle: false,
    tooltips: {
      enabled: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val: number | string) => {
            return formatNum(Number(val));
          },
        },
        grid: {
          drawTicks: false,
        },
        afterFit: (ctx: { width: number }) => {
          ctx.width = 32;
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
  };

  const formatChartLabels = (labels: string[]) => {
    return labels.map((label) => {
      const date = dayjs(label + '-01');
      switch (chartConfig.period) {
        case '1M':
          return dayjs(label).format('DD MMM');
        case '6M':
        case '1Y':
          return date.format(`MMM 'YY`);
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

  const staticYData = {
    labels: formatChartLabels(chartState.labels),
    datasets: [
      {
        label: 'Income',
        data: chartState.incomeData,
      },
      {
        label: 'Expenses',
        data: chartState.expensesData,
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
    <div className="flex justify-center rounded-md border border-accent/10 p-4 md:col-span-full lg:col-span-2">
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
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="selectMonth" className="sr-only">
                    Select Month
                  </label>
                  <div className="relative">
                    <Select
                      id="selectMonth"
                      className="w-32"
                      value={chartConfig.date.format('YYYY-MM')}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      aria-label="Select month"
                      options={availableMonthsByYear.map((month) => ({
                        label: dayjs(month + '-01').format('MMMM'),
                        value: month,
                      }))}
                    >
                      {currentMonth === undefined && chartConfig.year === dayjs().year() && (
                        <option value={dayjs().format('YYYY-MM')}>{dayjs().format('MMMM')}</option>
                      )}
                    </Select>

                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Icon SvgIcon={ChevronDownIcon} isBorderless />
                    </span>
                  </div>

                  <label htmlFor="selectYear" className="sr-only">
                    Select Year
                  </label>
                  <div className="relative">
                    <Select
                      id="selectYear"
                      className="w-[86px]"
                      value={chartConfig.year}
                      onChange={(e) => handleYearChange(e.target.value)}
                      aria-label="Select year"
                      options={availableYears.map((year) => ({
                        label: year,
                        value: year,
                      }))}
                    >
                      {currentYear === undefined && <option value={dayjs().year()}>{dayjs().year()}</option>}
                    </Select>

                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Icon SvgIcon={ChevronDownIcon} isBorderless />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative flex flex-row items-center">
              <div
                className={`absolute left-0 top-0 hover:pointer-events-none ${staticYWidthClass} ${chartConfig.period === '1M' ? 'h-[calc(100%-62px)]' : 'h-[calc(100%-42px)]'} rounded-md border border-accent/10 bg-card`}
              >
                <Line data={staticYData} height={300} options={staticYOptions} />
              </div>
              <div className="w-[800px] overflow-x-scroll pl-2">
                <Line data={chartData} width={800 - staticYWidth} height={300} options={options} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
