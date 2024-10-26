import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="col-span-1 col-start-2 flex flex-col gap-12 text-center md:mx-auto md:max-w-[85%]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
