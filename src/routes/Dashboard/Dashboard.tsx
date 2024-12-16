import { useLoaderData } from "react-router";
import supabase from "../../utils/supabase";

// components import
import SavingGoals, {
  SavingGoalFormProps,
} from "../../components/Dashboard/SavingGoals/SavingGoals";
import Budget from "../../components/Dashboard/Budget/Budget";
import AccountOverview, {
  Overview,
} from "../../components/Dashboard/AccountOverview/AccountOverview";
import { Table } from "../../components/Dashboard/Budget/BudgetTable";
import { useDashboard } from "../../context/DashboardContext";
import { useEffect } from "react";

interface DashboardProps {
  id: number;
  budget: Table[];
  saving_goals: SavingGoalFormProps[];
  overview: Overview[];
  categories: {
    id: number;
    name: string;
  }[];
}

const saving_goals = "saving_goals:saving_goals(*)";
const budget =
  "budget:budget(*, budget_categories(id, budget_id, name, spent, amount))";
const overview = "overview:overview(*)";
const categories = "categories:categories(*)";

export async function dashboardLoader() {
  const { data, error } = await supabase
    .from("dashboard")
    .select(`id, ${saving_goals}, ${budget}, ${overview}, ${categories}`)
    .single();

  if (error) {
    console.log(error);
  }

  if (data) {
    return data;
  }
}

export default function Dashboard() {
  const { setDashboardId } = useDashboard();
  let data = useLoaderData() as DashboardProps;

  useEffect(() => {
    setDashboardId(data.id);
  }, []);

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview data={data.overview} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SavingGoals data={data.saving_goals} />

        <div className="col-span-1 flex items-center justify-center rounded-md border border-accent/10 p-4 md:col-span-2">
          <p>VISUAL CHART</p>
        </div>

        <div className="col-span-full flex items-center justify-center rounded-md border border-accent/10 p-4 xl:col-span-1">
          <p>UPCOMING PAYMENT</p>
        </div>

        <Budget data={data.budget} fetchedCategories={data.categories} />
      </div>
    </div>
  );
}
