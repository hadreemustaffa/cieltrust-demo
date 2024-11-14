import { Outlet, useLocation } from "react-router";

// components import
import Header from "./Header";
import Footer from "./Footer";
import DashboardHeader from "./Dashboard/DashboardHeader";

export default function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard/";

  return (
    <>
      {isDashboard ? <DashboardHeader /> : <Header />}
      <main className="col-span-1 col-start-2 flex flex-col gap-16 text-center">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
