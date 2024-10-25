import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="col-span-1 col-start-2 grid grid-cols-6 gap-x-4 text-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
