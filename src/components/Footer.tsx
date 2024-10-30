import { Link } from "react-router-dom";
import { ButtonTertiary } from "./Button";
import NavLinks from "./NavLinks";

import logo from "../../public/images/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="col-span-full col-start-1 flex flex-col items-center gap-8 border border-accent/10 bg-surface p-8 text-center">
      <nav id="secondary-nav" className="flex flex-col items-center gap-8">
        <a href="/yourbank/" className="logo" aria-label="go to homepage">
          <img src={logo} width="48" height="48" alt="" />
        </a>

        <ul className="flex flex-col gap-8 md:flex-row">
          <NavLinks />
        </ul>
      </nav>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col items-center justify-center gap-4">
        <ButtonTertiary>
          {/* envelope-icon  */}
          yourbank@example.com.my
        </ButtonTertiary>

        <ButtonTertiary>
          {/* envelope-icon  */}
          +60&nbsp;(415)&nbsp;555&#8209;0132
        </ButtonTertiary>

        <ButtonTertiary>
          {/* envelope-icon  */}
          Kuala Lumpur, Malaysia
        </ButtonTertiary>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-4 md:w-full md:flex-row md:justify-between">
        <div className="flex flex-row justify-center gap-4">
          <a href="#" aria-label="facebook">
            {/* facebook-icon  */}
            Facebook
          </a>
          <a href="#" aria-label="twitter">
            {/* twitter-icon  */}
            Twitter
          </a>
        </div>

        <p className="text-sm text-accent/80">Yourbank All Rights Reserved</p>

        <div className="flex flex-row gap-4">
          <Link
            to="/yourbank/privacy/"
            className="text-sm text-link hover:text-link-hover"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
