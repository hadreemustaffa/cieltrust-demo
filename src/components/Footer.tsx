import { Link } from "react-router-dom";

// icons import
import MailIcon from "../images/icons/mail.svg?react";
import PhoneIcon from "../images/icons/phone.svg?react";
import MapPinIcon from "../images/icons/map-pin.svg?react";
import FacebookIcon from "../images/icons/facebook.svg?react";
import TwitterIcon from "../images/icons/twitter.svg?react";

// components import
import { ButtonTertiary, LinkButtonSecondary } from "./Button";
import NavLinks from "./NavLinks";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="col-span-full col-start-1 flex flex-col items-center gap-8 border border-accent/10 bg-surface p-8 text-center">
      <nav id="secondary-nav" className="flex flex-col items-center gap-8">
        <Link
          to="/"
          className="font-montserratSubrayada text-3xl font-bold text-brand/90 transition-colors duration-300 hover:text-brand"
          aria-label="go to homepage"
        >
          CielTrust
        </Link>

        <ul className="flex flex-col gap-8 md:flex-row">
          <NavLinks />
        </ul>
      </nav>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
        <ButtonTertiary>
          <Icon SvgIcon={MailIcon} isBorderless />
          cieltrust@example.com.my
        </ButtonTertiary>

        <ButtonTertiary>
          <Icon SvgIcon={PhoneIcon} isBorderless />
          +60&nbsp;(415)&nbsp;555&#8209;0132
        </ButtonTertiary>

        <ButtonTertiary>
          <Icon SvgIcon={MapPinIcon} isBorderless />
          Kuala Lumpur, Malaysia
        </ButtonTertiary>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-4 md:w-full md:flex-row md:justify-between">
        <div className="flex flex-row justify-center gap-4">
          <LinkButtonSecondary to="#">
            <Icon SvgIcon={FacebookIcon} isBorderless />
          </LinkButtonSecondary>

          <LinkButtonSecondary to="#">
            <Icon SvgIcon={TwitterIcon} isBorderless />
          </LinkButtonSecondary>
        </div>

        <p className="text-sm text-accent/80">CielTrust All Rights Reserved</p>

        <div className="flex flex-row gap-4">
          <Link
            to="/privacy/"
            className="text-sm text-link hover:text-link-hover"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
