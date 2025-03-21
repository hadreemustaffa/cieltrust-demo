import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import OverviewCard from './account-overview-card';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useOverview } from '@/hooks/use-overview';

export default function AccountOverview() {
  const { overview } = useOverview();
  const [isLoading, setIsLoading] = useState(true);
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    if (overview) {
      setIsLoading(false);
    }

    const today = new Date();
    if (today.getDate() === 21) {
      const lastMonthAmounts = {
        balance: overview?.balance,
        income: overview?.income,
        expenses: overview?.expenses,
        savings: overview?.savings,
      };
      setItem('lastMonthAmounts', JSON.stringify(lastMonthAmounts));
    }
  }, [overview, setItem]);

  const parsedValue = (value: string) => {
    const allStoredAmount = JSON.parse(getItem('lastMonthAmounts') || '{}');
    return allStoredAmount[value];
  };

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
          <OverviewCard columnTitle="balance" amount={overview.balance} lastMonthAmount={parsedValue('balance')} />
          <OverviewCard columnTitle="income" amount={overview.income} lastMonthAmount={parsedValue('income')} />
          <OverviewCard columnTitle="expenses" amount={overview.expenses} lastMonthAmount={parsedValue('expenses')} />
          <OverviewCard columnTitle="savings" amount={overview.savings} lastMonthAmount={parsedValue('savings')} />
        </>
      )}
    </div>
  );
}
