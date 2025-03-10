import Icon from '@/components/icon';
import CreditCardIcon from '@/images/icons/credit-card.svg?react';
import TrendingUpIcon from '@/images/icons/trending-up.svg?react';
import { AccountOverviewCardProps } from '@/routes/dashboard/account-overview/account-overview.types';

export default function AccountOverviewCard({ amount, columnTitle }: AccountOverviewCardProps) {
  return (
    <>
      <div className="flex flex-col gap-2 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-col justify-between gap-2 text-left">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon SvgIcon={CreditCardIcon} width={16} height={16} isBorderless />
              <p className="text-sm">{columnTitle[0].toUpperCase() + columnTitle.substring(1)}</p>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-sm bg-green-800 px-2 py-1 text-xs text-green-400">
              <p>+{0}%</p>
              <Icon SvgIcon={TrendingUpIcon} width={16} height={16} isBorderless />
            </div>
          </div>

          <p className="flex flex-row items-center gap-4 text-2xl font-bold">
            $ <span>{amount}</span>
          </p>
        </div>
        <div className="h-[1px] w-full bg-accent/10"></div>

        <p className="text-sm">
          Last month: <span className="font-semibold">$ {0}</span>
        </p>
      </div>
    </>
  );
}
