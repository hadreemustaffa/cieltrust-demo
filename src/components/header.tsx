import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@/images/icons/menu.svg?react';
import XIcon from '@/images/icons/x.svg?react';

import useOutsideClick from '@/hooks/use-outside-click';
import { useSession } from '@/hooks/use-session';

import { ButtonSecondary, LinkButtonPrimary, LinkButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import NavLinks from '@/components/nav-links';
import ThemeToggle from '@/components/theme-toggle';

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
    <header className="border-b-accent/10 bg-background grid-cols-base sm:grid-cols-sm md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl sticky top-0 z-50 col-span-full grid h-fit border-b py-3">
      <div className="col-start-2 flex flex-row items-center justify-between gap-2">
        <Link
          to="/"
          className="font-montserrat-subrayada text-brand/90 hover:text-brand text-3xl font-bold transition-colors duration-300"
          aria-label="go to homepage"
        >
          Cieltrust
        </Link>

        <nav id="primary-nav" ref={ref} className="relative lg:static lg:flex lg:w-full lg:items-center lg:justify-end">
          <ButtonSecondary
            className="absolute top-0 right-0 z-50 -translate-y-1/2 transform rounded-md hover:cursor-pointer lg:hidden lg:px-4"
            aria-label="navigation toggle button"
            aria-controls="headerNavMenu"
            aria-expanded="false"
            onClick={handleClick}
          >
            <Icon SvgIcon={isOpen ? XIcon : MenuIcon} width={16} height={16} isBorderless />
          </ButtonSecondary>

          <HeaderNavMenu isOpen={isOpen}>
            <NavLinks />

            <HeaderNavButtons>
              <ThemeToggle />

              {session ? (
                <LinkButtonPrimary to="/dashboard/" className="w-full">
                  Dashboard
                </LinkButtonPrimary>
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
      </div>
    </header>
  );
}

const HeaderNavMenu = ({ children, isOpen }: { children: ReactElement[]; isOpen: boolean }) => {
  return (
    <div
      id="headerNavMenu"
      className={`fixed top-0 right-0 z-40 flex h-dvh w-[min(75%,400px)] transform justify-between shadow-xs shadow-black/20 ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l-accent/10 bg-background flex-col gap-8 border-l px-4 pt-24 pb-16 duration-300 ease-in-out sm:px-8 md:px-12 lg:static lg:h-fit lg:w-fit lg:translate-x-0 lg:transform-none lg:flex-row lg:items-center lg:border-none lg:p-0 lg:pt-0 lg:shadow-none lg:duration-0`}
    >
      {children}
    </div>
  );
};

const HeaderNavButtons = ({ children }: { children: ReactElement[] }) => {
  return <div className="flex flex-col items-center gap-4 lg:flex-row">{children}</div>;
};
