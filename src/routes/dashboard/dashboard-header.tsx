import { redirect } from 'react-router';

import { logout } from '@/actions/logout';
import { ButtonTertiary } from '@/components/button';
import Icon from '@/components/icon';
import ThemeToggle from '@/components/theme-toggle';
import LogoutIcon from '@/images/icons/log-out.svg?react';

function DashboardHeader() {
  const handleLogout = () => {
    logout().then(() => {
      redirect('/login/');
    });
  };

  return (
    <header className="sticky top-0 z-50 col-span-3 col-start-1 flex h-fit flex-row flex-wrap items-center justify-between border-b border-b-accent/10 bg-background px-4 py-3 text-center sm:px-8 md:px-12 lg:px-24 xl:px-40">
      <p className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">Dashboard</p>

      <div className="flex flex-row items-center gap-2">
        <ThemeToggle />

        <div className="flex flex-row items-center gap-2">
          <ButtonTertiary onClick={handleLogout}>
            <Icon SvgIcon={LogoutIcon} isBorderless />
            <span className="hidden md:block md:text-nowrap">Log Out</span>
          </ButtonTertiary>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
