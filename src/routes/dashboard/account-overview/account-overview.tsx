import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import AccountOverviewCard from './account-overview-card';

import { useOverview } from '@/hooks/use-overview';
import { useSession } from '@/hooks/use-session';
import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';

export default function AccountOverview() {
  const { overview } = useOverview();
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useSession();

  const isAnonymousUser = session?.user?.is_anonymous;

  const setAmount = (value: keyof Overview['previous_month']) => {
    if (isAnonymousUser || !overview) {
      return 0;
    }

    return overview.previous_month?.[value] || 0;
  };

  useEffect(() => {
    if (overview) {
      setIsLoading(false);
    }
  }, [overview]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 rounded-md border border-accent/10 p-4 text-left md:grid-cols-2 2xl:grid-cols-4">
        <Skeleton height={125} containerClassName="rounded-md" />
        <Skeleton height={125} containerClassName="rounded-md" />
        <Skeleton height={125} containerClassName="rounded-md" />
        <Skeleton height={125} containerClassName="rounded-md" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md text-left sm:border sm:border-accent/10 sm:p-4 md:grid-cols-2 2xl:grid-cols-4">
      {overview && (
        <>
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
        </>
      )}
    </div>
  );
}
