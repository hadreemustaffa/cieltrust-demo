import { useLoaderData } from "react-router";
import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";
import supabase from "../../utils/supabase";
import { deleteUser } from "../../actions/delete";
import OverviewCard from "../../components/Dashboard/AccountOverview/OverviewCard";
import { useState } from "react";
import SavingGoals from "../../components/Dashboard/SavingGoals/SavingGoals";

type Overview = {
  total_balance: number;
  total_income: number;
  total_expenses: number;
  total_savings: number;
};

type DashboardProps = {
  overview: Overview[];
};

export async function dashboardLoader() {
  const { data, error } = await supabase
    .from("dashboard")
    .select("id")
    .single();

  if (error) {
    console.log(error);
  }

  if (data) {
    return data;
  }
}

function Dashboard() {
  let loaderData = useLoaderData() as { id: number };

  const { session } = useSession();
  const [data, setData] = useState<DashboardProps>({
    overview: [
      {
        total_balance: 0,
        total_income: 0,
        total_expenses: 0,
        total_savings: 0,
      },
    ],
  });

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview>
        <OverviewCard
          title="Total Balance"
          amount={data.overview[0].total_balance}
          prevAmount={0}
          percentage={0}
        />
        <OverviewCard
          title="Total Income"
          amount={data.overview[0].total_income}
          prevAmount={0}
          percentage={0}
        />
        <OverviewCard
          title="Total Expenses"
          amount={data.overview[0].total_expenses}
          prevAmount={0}
          percentage={0}
        />
        <OverviewCard
          title="Total Savings"
          amount={data.overview[0].total_savings}
          prevAmount={0}
          percentage={0}
        />
      </AccountOverview>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <SavingGoals dashboardId={loaderData.id} />
      </div>
    </div>
  );
}

export default Dashboard;
