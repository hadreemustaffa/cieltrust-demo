import { FocusEvent, useEffect, useRef, useState } from 'react';
import { redirect } from 'react-router';

import { logout } from '@/actions/logout';
import Icon from '@/components/icon';
import ThemeToggle from '@/components/theme-toggle';
import useOutsideClick from '@/hooks/use-outside-click';
import { useSession } from '@/hooks/use-session';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 col-span-3 col-start-1 flex h-fit flex-row flex-wrap items-center justify-between border-b border-b-accent/10 bg-background px-4 py-3 text-center sm:px-8 md:px-12 lg:px-24 xl:px-40">
      <h1 className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">Dashboard</h1>

      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />

        <button
          ref={buttonRef}
          type="button"
          className="flex flex-nowrap items-center gap-2 text-nowrap hover:underline"
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
            className={`absolute top-[105%] w-48 rounded-md border border-accent/10 bg-background p-2 shadow-lg transition-opacity`}
          >
            <li className="hover:bg-accent/10">
              <button type="button" className="block w-full px-4 py-2 text-left text-sm" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;
