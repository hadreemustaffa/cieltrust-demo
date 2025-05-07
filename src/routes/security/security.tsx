import { Fragment } from 'react/jsx-runtime';

import SecurityDesktopImg from '/images/illustrations/security-illustration-desktop.png';
import SecurityLaptopImg from '/images/illustrations/security-illustration-laptop.png';
import SecurityMobileImg from '/images/illustrations/security-illustration-mobile.png';

import FaqSection from '@/components/faq';
import Icon from '@/components/icon';
import Image from '@/components/image';
import { security } from '@/data/security';

export default function Security() {
  return (
    <>
      <div className="relative flex flex-col lg:text-left">
        <Image
          mobile={SecurityMobileImg}
          laptop={SecurityLaptopImg}
          desktop={SecurityDesktopImg}
          alt="two elderly person smiling"
          className="md:max-h-[500px]"
        />

        <div className="flex flex-col gap-4 border border-accent/10 bg-background p-8 md:absolute md:bottom-0 md:left-0 xl:max-w-[85ch]">
          <h1 className="text-3xl font-medium lg:text-5xl">
            Empowering You with <span className="text-brand">Safety</span> and{' '}
            <span className="text-brand">Confidence</span>
          </h1>
          <p>
            Your security is more than just a feature—it’s our commitment. From secure logins to account alerts, we
            offer a range of tools to help you protect your accounts. Bank confidently with CielTrust, knowing your
            financial safety is always our priority
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col gap-8 lg:text-left">
        <div className="flex max-w-[80ch] flex-col gap-4">
          <h2 className="text-2xl font-semibold">How We Protect Your Account</h2>
          <p>
            Our security team constantly monitors for potential threats and uses multiple layers of defense to safeguard
            your account and personal data.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start">
          {security.features.map((feature) => {
            return (
              <Fragment key={feature.title}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <div className="flex rounded-md border border-accent/10 p-4">
                      <Icon SvgIcon={feature.icon} />
                    </div>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col gap-8 lg:text-left">
        <div className="flex max-w-[80ch] flex-col gap-4">
          <h2 className="text-2xl font-semibold">How You Can Stay Secure</h2>
          <p>
            Security is a shared responsibility. From keeping your personal information private to double-checking
            suspicious links, these practices can help you maintain a secure banking experience.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start">
          {security.steps.map((step) => {
            return (
              <Fragment key={step.title}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <p>{step.description}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <FaqSection />
    </>
  );
}
