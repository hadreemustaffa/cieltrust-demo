import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import { BudgetTablesProvider } from '@/context/budget-tables-context';
import { CategoriesProvider } from '@/context/categories-context';
import { ModalProvider } from '@/context/modal-context';
import { useDashboard } from '@/hooks/use-dashboard';
import AccountOverview from '@/routes/dashboard/account-overview/account-overview';
import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import AddTransaction from '@/routes/dashboard/add-transaction/add-transaction';
import Budget from '@/routes/dashboard/budget/budget';
import { Category, Table } from '@/routes/dashboard/budget/budget.types';
import SavingGoals from '@/routes/dashboard/saving-goals/saving-goals';
import { SavingGoalsFormProps } from '@/routes/dashboard/saving-goals/saving-goals.types';
import UpcomingPayment from '@/routes/dashboard/upcoming-payment/upcoming-payment';
import supabase from '@/utils/supabase';

interface DashboardProps {
  id: number;
  budget: Table[];
  saving_goals: SavingGoalsFormProps[];
  overview: Overview[];
  categories: Category[];
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

  if (error) throw new Error('Failed to fetch dashboard data');
  if (!data) throw new Error('Dashboard data not found');

  return data;
}

export default function Dashboard() {
  const { setDashboardId } = useDashboard();
  const data = useLoaderData() as DashboardProps | undefined;

  useEffect(() => {
    if (data?.id) setDashboardId(data.id);
  }, [data?.id, setDashboardId]);

  if (!data) return <div>No dashboard data found.</div>;

  return (
    <ModalProvider>
      <CategoriesProvider initialCategories={data.categories || []}>
        <BudgetTablesProvider initialBudgetTables={data?.budget}>
          <div className="my-auto flex flex-col gap-4 text-left">
            <AddTransaction />
            <AccountOverview data={data?.overview?.[0]} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <SavingGoals data={data?.saving_goals} />

              <div className="col-span-1 flex items-center justify-center rounded-md border border-accent/10 p-4 md:col-span-2">
                <p>VISUAL CHART</p>
              </div>

              <UpcomingPayment />

              <Budget />
            </div>
          </div>
        </BudgetTablesProvider>
      </CategoriesProvider>
    </ModalProvider>
  );
}

Dashboard.loader = loader;
