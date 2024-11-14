// icons import
import LogoutIcon from "../../images/icons/log-out.svg?react";

// components import
import { LinkButtonSecondary } from "../Button";
import ThemeToggle from "../ThemeToggle";
import Icon from "../Icon";
import { useAuth } from "../../context/AuthProvider";

function DashboardHeader() {
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-50 col-span-3 col-start-1 flex h-fit flex-row flex-wrap items-center justify-between border-b border-b-accent/10 bg-background px-4 py-3 text-center sm:px-8 md:px-12 lg:px-24 xl:px-40">
      <p className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">
        Dashboard
      </p>

      <div className="flex flex-row items-center gap-2">
        <ThemeToggle />

        <div className="flex flex-row items-center gap-2">
          <LinkButtonSecondary onClick={auth.logout} to="/login/">
            <Icon SvgIcon={LogoutIcon} isBorderless />
            <span className="hidden md:block">Log Out</span>
          </LinkButtonSecondary>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
