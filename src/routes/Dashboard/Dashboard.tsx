import { useLoaderData } from "react-router";
import supabase from "../../utils/supabase";

// components import
import SavingGoals, {
  SavingGoalFormProps,
} from "../../components/Dashboard/SavingGoals/SavingGoals";
import Budget, { BudgetTable } from "../../components/Dashboard/Budget/Budget";
import AccountOverview, {
  Overview,
} from "../../components/Dashboard/AccountOverview/AccountOverview";

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
    return data;
  }
}

export default function Dashboard() {
  let data = useLoaderData() as DashboardProps;

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview dashboardId={data.id} data={data.overview} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-4">
          <SavingGoals dashboardId={data.id} data={data.saving_goals} />
          <Budget dashboardId={data.id} data={data.budget} />
        </div>
      </div>
    </div>
  );
}
