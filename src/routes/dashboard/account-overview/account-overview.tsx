import Skeleton from 'react-loading-skeleton';

import { useAppSelector } from '@/hooks/use-redux';
import { useSession } from '@/hooks/use-session';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import { useGetOverviewQuery } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';

import AccountOverviewCard from './account-overview-card';

export default function AccountOverview() {
  const { session } = useSession();
  const dashboardId = useAppSelector(getDashboardId);
  const { data: overview, isLoading, isSuccess } = useGetOverviewQuery(dashboardId);

  const isAnonymousUser = session?.user?.is_anonymous;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 rounded-md text-left sm:border sm:border-accent/10 sm:p-4">
        <div className="flex flex-row gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-x-visible 2xl:grid-cols-4">
          <Skeleton height={100} width={310} />
          <Skeleton height={100} width={310} />
          <Skeleton height={100} width={310} />
          <Skeleton height={100} width={310} />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const setAmount = (value: keyof Overview['previous_month']) => {
      if (isAnonymousUser || !overview) {
        return 0;
      }

      return overview.previous_month?.[value] || 0;
    };

    return (
      <div className="grid grid-cols-1 rounded-md text-left sm:border sm:border-accent/10 sm:p-4">
        <div className="flex flex-row gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-x-visible 2xl:grid-cols-4">
          <AccountOverviewCard columnTitle="balance" amount={overview.balance} lastMonthAmount={setAmount('balance')} />
          <AccountOverviewCard
            columnTitle="income"
            amount={overview.income}
            lastMonthAmount={setAmount('income')}
            hasTooltip
          />
          <AccountOverviewCard
            columnTitle="expenses"
            amount={overview.expenses}
            lastMonthAmount={setAmount('expenses')}
            hasTooltip
          />
          <AccountOverviewCard columnTitle="savings" amount={overview.savings} lastMonthAmount={setAmount('savings')} />
        </div>
      </div>
    );
  }
}
