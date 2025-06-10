import { Link } from 'react-router-dom';

import FacebookIcon from '@/images/icons/facebook.svg?react';
import MailIcon from '@/images/icons/mail.svg?react';
import MapPinIcon from '@/images/icons/map-pin.svg?react';
import PhoneIcon from '@/images/icons/phone.svg?react';
import TwitterIcon from '@/images/icons/twitter.svg?react';

import { ButtonTertiary, LinkButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import NavLinks from '@/components/nav-links';

export default function Footer() {
  return (
    <footer className="border-accent/10 bg-surface col-span-full col-start-1 flex flex-col items-center gap-8 border p-8 text-center">
      <nav id="secondary-nav" className="flex flex-col items-center gap-8">
        <Link
          to="/"
          className="font-montserrat-subrayada text-brand/90 hover:text-brand text-3xl font-bold transition-colors duration-300"
          aria-label="go to homepage"
        >
          Cieltrust
        </Link>

        <ul className="flex flex-col gap-8 md:flex-row">
          <NavLinks />
        </ul>
      </nav>

      <div className="bg-accent/10 h-px w-full"></div>

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

      <div className="bg-accent/10 h-px w-full"></div>

      <div className="border-accent/10 flex flex-col items-center gap-8 rounded-md border p-4 md:w-full md:flex-row md:justify-between">
        <div className="flex flex-row justify-center gap-4">
          <LinkButtonSecondary to="#">
            <Icon SvgIcon={FacebookIcon} isBorderless />
          </LinkButtonSecondary>

          <LinkButtonSecondary to="#">
            <Icon SvgIcon={TwitterIcon} isBorderless />
          </LinkButtonSecondary>
        </div>

        <p className="text-accent/80 text-sm">Cieltrust All Rights Reserved</p>

        <div className="flex flex-row gap-4">
          <Link to="/privacy/" className="text-link hover:text-link-hover text-sm">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
