import { AuthError } from '@supabase/supabase-js';
import { useLoaderData } from 'react-router';

import supabase from '@/utils/supabase';

import { BudgetTablesProvider } from '@/context/budget-tables-context';
import { OverviewProvider } from '@/context/overview-context';
import { TransactionHistoryProvider } from '@/context/transaction-history-context';

import { useAppDispatch } from '@/hooks/use-redux';

import AccountOverview from '@/routes/dashboard/account-overview/account-overview';
import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import AddTransaction from '@/routes/dashboard/add-transaction/add-transaction';
import Budget from '@/routes/dashboard/budget/budget';
import { Table } from '@/routes/dashboard/budget/budget.types';
import { Categories } from '@/routes/dashboard/categories/categories.types';
import { setDashboardId } from '@/routes/dashboard/dashboard-slice';
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
const upcoming_payment = 'upcoming_payment(*)';

async function loader() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`dashboard_id, ${saving_goals}, ${budget}, ${overview}, ${upcoming_payment}`)
      .single();

    if (error) {
      throw new Error(`${error.message} (Code: ${error.code})`);
    }

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      if (error.message && !error.code) {
        throw error;
      } else {
        throw new Error('Unexpected error loading dashboard. Please try again later.');
      }
    }
  }
}

export default function Dashboard() {
  const data = useLoaderData() as DashboardProps;
  const dispatch = useAppDispatch();

  dispatch(setDashboardId(data.dashboard_id));

  return (
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
  );
}

Dashboard.loader = loader;
