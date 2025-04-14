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
  const percentDifference = ((amount - lastMonthAmount) / lastMonthAmount) * 100;

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-col justify-between gap-2 text-left">
          <div className="flex flex-row items-center justify-between">
            <div className="relative flex flex-row items-center gap-2">
              <Icon SvgIcon={CreditCardIcon} width={16} height={16} isBorderless />
              <p className="text-sm">{columnTitle[0].toUpperCase() + columnTitle.substring(1)}</p>
              {hasTooltip && <Tooltip text="This value resets on the first day of each month" />}
            </div>
            {lastMonthAmount <= amount ? (
              <div className="flex flex-row items-center gap-2 rounded-sm bg-green-800 px-2 py-1 text-xs text-white">
                <p>+{lastMonthAmount === 0 ? amount : Math.round(percentDifference)}%</p>
                <Icon SvgIcon={TrendingUpIcon} width={16} height={16} isBorderless />
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2 rounded-sm bg-red-700 px-2 py-1 text-xs text-white">
                <p>{Math.round(percentDifference)}%</p>
                <Icon SvgIcon={TrendingDownIcon} width={16} height={16} isBorderless />
              </div>
            )}
          </div>

          <p className="flex flex-row items-center gap-2 text-2xl font-bold">
            $ <span>{amount}</span>
          </p>
        </div>
        <div className="h-[1px] w-full bg-accent/10"></div>

        <p className="text-sm">
          Last month: <span className="font-semibold">{lastMonthAmount}</span>
        </p>
      </div>
    </>
  );
}
