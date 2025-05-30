import { AuthError } from '@supabase/supabase-js';

import supabase from '@/utils/supabase';

import AccountOverview from '@/routes/dashboard/account-overview/account-overview';
import AddTransaction from '@/routes/dashboard/add-transaction/add-transaction';
import Budget from '@/routes/dashboard/budget/budget';
import { setDashboardId } from '@/routes/dashboard/dashboard.slice';
import ManageCategories from '@/routes/dashboard/manage-categories/manage-categories';
import SavingGoals from '@/routes/dashboard/saving-goals/saving-goals';
import TransactionHistory from '@/routes/dashboard/transaction-history/transaction-history';
import UpcomingPayments from '@/routes/dashboard/upcoming-payment/upcoming-payment';
import VisualChart from '@/routes/dashboard/visual-chart/visual-chart';

import { store } from '@/store';

async function loader() {
  try {
    const { data, error } = await supabase.from('users').select('dashboard_id').single();

    if (error) {
      throw new Error(`${error.message} (Code: ${error.code})`);
    }

    store.dispatch(setDashboardId(data.dashboard_id));

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
  return (
    <div className="my-auto flex flex-col gap-4 text-left">
      <div className="flex flex-row gap-2 self-end">
        <ManageCategories />
        <TransactionHistory />
        <AddTransaction />
      </div>

      <AccountOverview />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <UpcomingPayments />
        <Budget />
        <VisualChart />
        <SavingGoals />
      </div>
    </div>
  );
}

Dashboard.loader = loader;
