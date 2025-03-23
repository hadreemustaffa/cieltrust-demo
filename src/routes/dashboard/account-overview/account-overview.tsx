import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import OverviewCard from './account-overview-card';

import { useOverview } from '@/hooks/use-overview';
import { useSession } from '@/hooks/use-session';

export default function AccountOverview() {
  const { overview } = useOverview();
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useSession();

  const isAnonymousUser = session?.user?.is_anonymous;

  const DAY_TO_SYNC_OVERVIEW = 28;

  const setAmount = (value: string) => {
    if (isAnonymousUser) {
      return 0;
    }

    const today = new Date();

    if (overview && today.getDate() === DAY_TO_SYNC_OVERVIEW) {
      if (value === 'balance') {
        return overview.balance;
      } else if (value === 'income') {
        return overview.income;
      } else if (value === 'expenses') {
        return overview.expenses;
      } else if (value === 'savings') {
        return overview.savings;
      }
    }

    return 0;
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
    <div className="grid grid-cols-1 gap-4 rounded-md border border-accent/10 p-4 text-left md:grid-cols-2 2xl:grid-cols-4">
      {overview && (
        <>
          <OverviewCard columnTitle="balance" amount={overview.balance} lastMonthAmount={setAmount('balance')} />
          <OverviewCard columnTitle="income" amount={overview.income} lastMonthAmount={setAmount('income')} />
          <OverviewCard columnTitle="expenses" amount={overview.expenses} lastMonthAmount={setAmount('expenses')} />
          <OverviewCard columnTitle="savings" amount={overview.savings} lastMonthAmount={setAmount('savings')} />
        </>
      )}
    </div>
  );
}
