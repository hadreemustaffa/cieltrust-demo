import Icon from '@/components/icon';
import Tooltip from '@/components/tooltip';
import CreditCardIcon from '@/images/icons/credit-card.svg?react';
import TrendingDownIcon from '@/images/icons/trending-down.svg?react';
import TrendingUpIcon from '@/images/icons/trending-up.svg?react';
import { AccountOverviewCardProps } from '@/routes/dashboard/account-overview/account-overview.types';

export default function AccountOverviewCard({
  amount,
  lastMonthAmount,
  columnTitle,
  hasTooltip,
}: AccountOverviewCardProps) {
  const isExpenses = columnTitle === 'expenses';

  const calculatePercentChange = () => {
    if (lastMonthAmount === 0) {
      return amount === 0 ? 0 : amount;
    }

    const percentChange = ((amount - lastMonthAmount) / Math.abs(lastMonthAmount)) * 100;
    return Math.round(percentChange);
  };

  const isIncrease = amount >= lastMonthAmount;
  const percentChange = calculatePercentChange();

  const isPositiveTrend = isExpenses ? !isIncrease : isIncrease;

  const trendColor = isPositiveTrend ? 'bg-green-800' : 'bg-red-700';
  const TrendIcon = isIncrease ? TrendingUpIcon : TrendingDownIcon;

  const formattedPercent = `${isIncrease ? '+' : ''}${percentChange}%`;

  const formattedTitle = columnTitle.charAt(0).toUpperCase() + columnTitle.slice(1);

  return (
    <div className="flex min-w-60 flex-col gap-2 rounded-md border border-accent/10 bg-surface p-4">
      <div className="flex flex-col justify-between gap-2 text-left">
        <div className="flex flex-row items-center justify-between">
          <div className="relative flex flex-row items-center gap-2">
            <Icon SvgIcon={CreditCardIcon} width={16} height={16} isBorderless />
            <p className="text-sm">{formattedTitle}</p>
            {hasTooltip && <Tooltip text="This value resets on the first day of each month" />}
          </div>

          <div className={`flex flex-row items-center gap-2 rounded-sm ${trendColor} px-2 py-1 text-xs text-white`}>
            <p>{formattedPercent}</p>
            <Icon SvgIcon={TrendIcon} width={16} height={16} isBorderless />
          </div>
        </div>

        <p className="flex flex-row items-center gap-2 text-2xl font-bold">
          $ <span>{Math.round(amount)}</span>
        </p>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <p className="text-sm">
        Last month: <span className="font-semibold">{Math.round(lastMonthAmount)}</span>
      </p>
    </div>
  );
}
