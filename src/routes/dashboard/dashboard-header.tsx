import { FocusEvent, useEffect, useRef, useState } from 'react';
import { redirect } from 'react-router';

import { logout } from '@/actions/logout';
import Icon from '@/components/icon';
import ThemeToggle from '@/components/theme-toggle';
import useOutsideClick from '@/hooks/use-outside-click';
import { useSession } from '@/hooks/use-session';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import LogoutIcon from '@/images/icons/log-out.svg?react';
import SettingsIcon from '@/images/icons/settings.svg?react';
import Settings from '@/routes/dashboard/settings/settings';

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const ref = useOutsideClick<HTMLUListElement>(() => setIsOpen(false));
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { session } = useSession();

  const isAnonymousUser = session?.user?.is_anonymous;
  const userFullName = `${session?.user.user_metadata.first_name} ${session?.user.user_metadata.last_name}`;

  const handleLogout = () => {
    logout().then(() => {
      redirect('/login/');
    });
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.relatedTarget || !ref?.current?.contains(event.relatedTarget) || event.relatedTarget === ref.current) {
      setIsOpen(false);
    }
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.removeAttribute('style');
      };
    }
  }, [isSettingsOpen]);

  return (
    <header className="sticky top-0 z-50 col-span-3 col-start-1 flex h-fit flex-row flex-wrap items-center justify-between gap-2 border-b border-b-accent/10 bg-background px-4 py-3 text-center sm:px-8 md:px-12 lg:px-24 xl:px-40">
      <h1 className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">Dashboard</h1>

      <div className="relative flex flex-row items-center gap-4">
        <ThemeToggle />

        <button
          ref={buttonRef}
          type="button"
          className="flex flex-nowrap items-center gap-2 text-nowrap rounded-md border border-accent/30 p-2 hover:border-accent/50"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={handleBlur}
        >
          {isAnonymousUser ? 'Anonymous' : `${userFullName}`}
          <Icon SvgIcon={ChevronDownIcon} width={16} height={16} isBorderless />
        </button>

        {isOpen && (
          <ul
            ref={ref}
            onBlur={handleBlur}
            className={`absolute right-0 top-12 w-48 rounded-md border border-accent/10 bg-background p-2 shadow-lg transition-opacity`}
          >
            <li className="rounded-sm hover:bg-accent/10">
              {!isAnonymousUser && (
                <button
                  type="button"
                  onClick={handleSettingsOpen}
                  className="flex w-full flex-row items-center gap-2 p-2 text-left"
                >
                  <Icon SvgIcon={SettingsIcon} width={16} height={16} isBorderless />
                  Settings
                </button>
              )}
            </li>
            <li className="rounded-sm hover:bg-accent/10">
              <button
                type="button"
                className="flex w-full flex-row items-center gap-2 p-2 text-left"
                onClick={handleLogout}
              >
                <Icon SvgIcon={LogoutIcon} width={16} height={16} isBorderless />
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>

      <div
        className={`fixed inset-y-0 right-0 flex h-full w-full transform flex-col border-l border-l-accent/10 bg-background shadow-lg transition-transform duration-300 ease-in-out sm:w-80 ${
          isSettingsOpen ? 'pointer-events-auto translate-x-0' : 'pointer-events-none translate-x-full'
        } `}
        aria-hidden={!isSettingsOpen}
      >
        {isSettingsOpen && (
          <Settings
            firstName={session?.user.user_metadata.first_name}
            lastName={session?.user.user_metadata.last_name}
            handleClose={() => setIsSettingsOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;
