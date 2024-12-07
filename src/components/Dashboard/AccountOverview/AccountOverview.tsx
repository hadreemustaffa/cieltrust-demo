import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import supabase from "../../../utils/supabase";

// components import
import OverviewCard from "./OverviewCard";

export interface Overview {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
}

interface AccountOverviewProps {
  dashboardId: number;
  data: Overview[];
}

function AccountOverview({ dashboardId, data }: AccountOverviewProps) {
  const [overview, setOverview] = useState<Overview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOverview = async () => {
    if (data) {
      setOverview(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

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
      {overview && overview.length > 0 && (
        <>
          <OverviewCard
            dashboardId={dashboardId}
            columnTitle="balance"
            amount={
              overview[0].income -
              overview[0].expenses -
              overview[0].income * 0.2
            }
          />
          <OverviewCard
            dashboardId={dashboardId}
            columnTitle="income"
            amount={overview[0].income}
          />
          <OverviewCard
            dashboardId={dashboardId}
            columnTitle="expenses"
            amount={overview[0].expenses}
          />
          <OverviewCard
            dashboardId={dashboardId}
            columnTitle="savings"
            amount={overview[0].income * 0.2}
          />
        </>
      )}
    </div>
  );
}

export default AccountOverview;
