import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import supabase from '@/utils/supabase';

import { BudgetTablesProvider } from '@/context/budget-tables-context';
import { CategoriesProvider } from '@/context/categories-context';
import { ModalProvider } from '@/context/modal-context';
import { OverviewProvider } from '@/context/overview-context';
import { TransactionHistoryProvider } from '@/context/transaction-history-context';

import { useDashboard } from '@/hooks/use-dashboard';

import AccountOverview from '@/routes/dashboard/account-overview/account-overview';
import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import AddTransaction from '@/routes/dashboard/add-transaction/add-transaction';
import Budget from '@/routes/dashboard/budget/budget';
import { Table } from '@/routes/dashboard/budget/budget.types';
import { Categories } from '@/routes/dashboard/categories/categories.types';
import ManageCategories from '@/routes/dashboard/manage-categories/manage-categories';
import SavingGoals from '@/routes/dashboard/saving-goals/saving-goals';
import { SavingGoalsFormProps } from '@/routes/dashboard/saving-goals/saving-goals.types';
import TransactionHistory from '@/routes/dashboard/transaction-history/transaction-history';
import UpcomingPayments from '@/routes/dashboard/upcoming-payment/upcoming-payment';
import { UpcomingPayment } from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';
import VisualChart from '@/routes/dashboard/visual-chart/visual-chart';

interface DashboardProps {
  dashboard_id: number;
  budget: Table[];
  saving_goals: SavingGoalsFormProps[];
  overview: Overview[];
  categories: Categories;
  upcoming_payment: UpcomingPayment[];
}

const saving_goals = 'saving_goals(*)';
const budget = 'budget(*, budget_categories(*))';
const overview = 'overview(*)';
const categories = 'categories(*)';
const upcoming_payment = 'upcoming_payment(*)';

async function loader() {
  const { data, error } = await supabase
    .from('users')
    .select(`dashboard_id, ${saving_goals}, ${budget}, ${overview}, ${categories}, ${upcoming_payment}`)
    .single();

  if (error) throw new Error('Failed to fetch dashboard data');
  if (!data) throw new Error('Dashboard data not found');

  return data;
}

export default function Dashboard() {
  const { setDashboardId } = useDashboard();
  const data = useLoaderData() as DashboardProps;

  useEffect(() => {
    if (data?.dashboard_id) {
      setDashboardId(data.dashboard_id);
    }
  }, [data?.dashboard_id, setDashboardId]);

  return (
    <ModalProvider>
      <CategoriesProvider initialCategories={data.categories}>
        <BudgetTablesProvider initialBudgetTables={data.budget}>
          <OverviewProvider initialOverview={data.overview[0]}>
            <TransactionHistoryProvider>
              <div className="my-auto flex flex-col gap-4 text-left">
                <div className="flex flex-row gap-2 self-end">
                  <ManageCategories />
                  <TransactionHistory />
                  <AddTransaction />
                </div>
                <AccountOverview />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <UpcomingPayments initialUpcomingPayments={data.upcoming_payment} />
                  <Budget />
                  <VisualChart />
                  <SavingGoals data={data.saving_goals} />
                </div>
              </div>
            </TransactionHistoryProvider>
          </OverviewProvider>
        </BudgetTablesProvider>
      </CategoriesProvider>
    </ModalProvider>
  );
}

Dashboard.loader = loader;
