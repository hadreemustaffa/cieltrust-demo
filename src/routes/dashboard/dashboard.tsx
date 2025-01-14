import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import { BudgetTablesProvider } from '@/context/budget-tables-context';
import { CategoriesProvider } from '@/context/categories-context';
import { useDashboard } from '@/hooks/use-dashboard';
import AccountOverview from '@/routes/dashboard/account-overview/account-overview';
import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import Budget from '@/routes/dashboard/budget/budget';
import { Table } from '@/routes/dashboard/budget/budget.types';
import SavingGoals from '@/routes/dashboard/saving-goals/saving-goals';
import { SavingGoalsFormProps } from '@/routes/dashboard/saving-goals/saving-goals.types';
import UpcomingPayment from '@/routes/dashboard/upcoming-payment/upcoming-payment';
import supabase from '@/utils/supabase';

interface DashboardProps {
  id: number;
  budget: Table[];
  saving_goals: SavingGoalsFormProps[];
  overview: Overview[];
  categories: {
    id: number;
    name: string;
  }[];
}

const saving_goals = 'saving_goals:saving_goals(*)';
const budget = 'budget:budget(*, budget_categories(id, budget_id, name, spent, amount))';
const overview = 'overview:overview(*)';
const categories = 'categories:categories(*)';

async function loader() {
  const { data, error } = await supabase
    .from('dashboard')
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
  const data = useLoaderData() as DashboardProps;

  useEffect(() => {
    setDashboardId(data.id);
  }, [data.id, setDashboardId]);

  return (
    <CategoriesProvider initialCategories={data.categories}>
      <div className="flex flex-col gap-4 text-left">
        <AccountOverview data={data.overview[0]} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <SavingGoals data={data.saving_goals} />

          <div className="col-span-1 flex items-center justify-center rounded-md border border-accent/10 p-4 md:col-span-2">
            <p>VISUAL CHART</p>
          </div>

          <BudgetTablesProvider initialBudgetTables={data.budget}>
            <UpcomingPayment />

            <Budget />
          </BudgetTablesProvider>
        </div>
      </div>
    </CategoriesProvider>
  );
}

Dashboard.loader = loader;
