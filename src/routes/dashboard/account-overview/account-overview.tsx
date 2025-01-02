import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import OverviewCard from './account-overview-card';

import { AccountOverviewProps } from '@/routes/dashboard/account-overview/account-overview.types';

export default function AccountOverview(data: AccountOverviewProps) {
  const [overview, setOverview] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOverview(data);
    setIsLoading(false);
  }, [data]);

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

  const balance = overview.data.balance;
  const income = overview.data.income;
  const expenses = overview.data.expenses;
  const savings = overview.data.income * 0.2;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-accent/10 p-4 text-left md:grid-cols-2 2xl:grid-cols-4">
      {overview && (
        <>
          <OverviewCard columnTitle="balance" amount={balance + income - expenses - savings} />
          <OverviewCard columnTitle="income" amount={income} />
          <OverviewCard columnTitle="expenses" amount={expenses} />
          <OverviewCard columnTitle="savings" amount={savings} />
        </>
      )}
    </div>
  );
}
