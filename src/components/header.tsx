import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonSecondary, LinkButtonPrimary, LinkButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import NavLinks from '@/components/nav-links';
import ThemeToggle from '@/components/theme-toggle';
import useOutsideClick from '@/hooks/use-outside-click';
import { useSession } from '@/hooks/use-session';
import MenuIcon from '@/images/icons/menu.svg?react';
import XIcon from '@/images/icons/x.svg?react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.removeAttribute('style');
      };
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 col-span-3 col-start-1 flex h-fit flex-row items-center justify-between border-b border-b-accent/10 bg-background px-4 py-3 text-center sm:px-8 md:px-12 lg:px-24 xl:px-40">
      <Link
        to="/"
        className="font-montserratSubrayada text-3xl font-bold text-brand/90 transition-colors duration-300 hover:text-brand"
        aria-label="go to homepage"
      >
        CielTrust
      </Link>

      <nav
        id="primary-nav"
        ref={ref}
        className="relative col-span-full col-start-4 lg:static lg:flex lg:w-full lg:items-center lg:justify-end"
      >
        <ButtonSecondary
          className="absolute right-0 top-0 z-50 -translate-y-1/2 transform rounded-md hover:cursor-pointer lg:hidden lg:px-4"
          aria-label="navigation toggle button"
          aria-controls="headerNavMenu"
          aria-expanded="false"
          onClick={handleClick}
        >
          <Icon SvgIcon={isOpen ? XIcon : MenuIcon} width={16} height={16} isBorderless />
        </ButtonSecondary>

        <HeaderNavMenu isOpen={isOpen}>
          <ul className="flex flex-col gap-8 lg:flex-row">
            <NavLinks />
          </ul>

          <HeaderNavButtons>
            <ThemeToggle />

            {session ? (
              <>
                <LinkButtonPrimary to="/dashboard/">Dashboard</LinkButtonPrimary>
              </>
            ) : (
              <>
                <LinkButtonSecondary to="/signup/" className="w-full">
                  Sign Up
                </LinkButtonSecondary>
                <LinkButtonPrimary to="/login/" className="w-full">
                  Login
                </LinkButtonPrimary>
              </>
            )}
          </HeaderNavButtons>
        </HeaderNavMenu>
      </nav>
    </header>
  );
}

const HeaderNavMenu = ({ children, isOpen }: { children: ReactElement[]; isOpen: boolean }) => {
  return (
    <div
      id="headerNavMenu"
      className={`fixed right-0 top-0 z-40 flex h-dvh w-[300px] transform justify-between shadow-sm shadow-black/20 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex-col gap-8 border-l border-l-accent/10 bg-background px-4 pb-16 pt-24 duration-300 ease-in-out sm:px-8 md:px-12 lg:static lg:h-fit lg:w-fit lg:translate-x-0 lg:transform-none lg:flex-row lg:items-center lg:border-none lg:p-0 lg:pt-0 lg:shadow-none lg:duration-0`}
    >
      {children}
    </div>
  );
};

const HeaderNavButtons = ({ children }: { children: ReactElement[] }) => {
  return <div className="flex flex-col items-center gap-4 lg:flex-row">{children}</div>;
};
