import { Outlet, useLocation } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import DashboardHeader from '@/routes/dashboard/dashboard-header';

export default function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard/';

  return (
    <>
      {isDashboard ? <DashboardHeader /> : <Header />}
      <main className="col-span-1 col-start-2 flex flex-col gap-16 text-center">
        <Outlet />
        <ScrollRestoration />
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
