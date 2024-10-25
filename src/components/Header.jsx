import { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonMenuToggle, ButtonSecondary } from "./Button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky col-start-2 flex h-fit flex-row items-center justify-between border-b border-b-surface bg-background py-3 text-center">
      <Link href="/yourbank/" className="logo" aria-label="go to homepage">
        <img src="./images/icons/logo.svg" width="48" height="48" alt="" />
      </Link>

      <nav id="primary-nav" className="relative col-span-full col-start-4">
        <ButtonMenuToggle
          isMobileOnly={true}
          aria-label="navigation toggle button"
          aria-controls="navDrawer"
          aria-expanded="false"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="var(--gray-1)"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </ButtonMenuToggle>

        <div
          id="navMenu"
          className={`fixed right-0 top-0 z-40 flex h-screen w-1/2 transform justify-between ${isOpen ? "translate-x-0" : "translate-x-full"} flex-col gap-16 border-l border-l-surface bg-background p-6 pt-24 duration-300 ease-in-out`}
        >
          <NavLinks />

          <NavButtons />
        </div>
      </nav>
    </header>
  );
}

const NavLinks = () => {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Link href="/yourbank/" className="block">
          Home
        </Link>
      </li>
      <li>
        <Link href="/yourbank/careers/" className="block">
          Careers
        </Link>
      </li>
      <li>
        <Link href="/yourbank/about/" className="block">
          About
        </Link>
      </li>
      <li>
        <Link href="/yourbank/security/" className="block">
          Security
        </Link>
      </li>
    </ul>
  );
};

const NavButtons = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonSecondary
        id="theme-toggle"
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
      >
        <svg
          className="sun-and-moon"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <mask className="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
          <circle
            className="sun"
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="var(--gray-12)"
          />
          <g className="sun-beams" stroke="var(--gray-12)">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </ButtonSecondary>

      <Link href="/yourbank/signup/" className="btn btn-secondary">
        Sign Up
      </Link>
      <Link href="/yourbank/login/" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};
