import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonMenuToggle, LinkButtonPrimary, LinkButtonSecondary } from '@/components/button';
import NavLinks from '@/components/nav-links';
import ThemeToggle from '@/components/theme-toggle';
import { useSession } from '@/hooks/use-session';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
        className="relative col-span-full col-start-4 lg:static lg:flex lg:w-full lg:items-center lg:justify-end"
      >
        <ButtonMenuToggle
          className="lg:hidden"
          aria-label="navigation toggle button"
          aria-controls="HeaderNavMenu"
          aria-expanded="false"
          onClick={handleClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-background">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </ButtonMenuToggle>

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
      className={`fixed right-0 top-0 z-40 flex h-screen w-1/2 transform justify-between ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex-col gap-16 border-l border-l-accent/10 bg-background p-6 pt-24 duration-300 ease-in-out lg:static lg:h-fit lg:w-fit lg:translate-x-0 lg:transform-none lg:flex-row lg:items-center lg:border-none lg:p-0 lg:pt-0 lg:duration-0`}
    >
      {children}
    </div>
  );
};

const HeaderNavButtons = ({ children }: { children: ReactElement[] }) => {
  return <div className="flex flex-col items-center gap-4 lg:flex-row">{children}</div>;
};
