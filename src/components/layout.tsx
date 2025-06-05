import { Outlet, useLocation } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import DashboardHeader from '@/routes/dashboard/dashboard-header';

export default function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard/';

  return (
    <div className="bg-background grid-cols-base sm:grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl grid-rows-base font-lexend text-copy grid min-h-screen gap-y-16 text-sm font-light sm:text-base">
      {isDashboard ? <DashboardHeader /> : <Header />}
      <main className="col-span-1 col-start-2 flex flex-col gap-16 text-center">
        <Outlet />
        <ScrollRestoration />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}
