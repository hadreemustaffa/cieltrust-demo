import { useLoaderData } from "react-router";
import AccountOverview, {
  Overview,
} from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";
import supabase from "../../utils/supabase";
import { deleteUser } from "../../actions/delete";
import SavingGoals, {
  SavingGoalFormProps,
} from "../../components/Dashboard/SavingGoals/SavingGoals";
import Budget, { BudgetTable } from "../../components/Dashboard/Budget/Budget";
import { useMemo } from "react";

interface DashboardProps {
  id: number;
  budget: BudgetTable[];
  saving_goals: SavingGoalFormProps[];
  overview: Overview[];
}

const saving_goals = "saving_goals:saving_goals(*)";
const budget = "budget:budget(*, budget_categories:budget_categories(*))";
const overview = "overview:overview(*)";

export async function dashboardLoader() {
  const { data, error } = await supabase
    .from("dashboard")
    .select(`id, ${saving_goals}, ${budget}, ${overview}`)
    .single();

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
    return data;
  }
}

export default function Dashboard() {
  let data = useLoaderData() as DashboardProps;

  console.log(data);

  const { session } = useSession();

  const accountOverviewProps = useMemo(
    () => ({
      dashboardId: data.id,
      data: data.overview,
    }),
    [data.id, data.overview],
  );

  const savingGoalsProps = useMemo(
    () => ({
      dashboardId: data.id,
      data: data.saving_goals,
    }),
    [data.id, data.saving_goals],
  );

  const budgetProps = useMemo(
    () => ({
      dashboardId: data.id,
      data: data.budget,
    }),
    [data.id, data.budget],
  );

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview {...accountOverviewProps} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-4">
          <SavingGoals {...savingGoalsProps} />
          <Budget {...budgetProps} />
        </div>
      </div>
    </div>
  );
}
