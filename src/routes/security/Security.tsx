import { Fragment } from "react/jsx-runtime";
import { security } from "../../data/security";

// components import
import FaqSection from "../../components/FaqSection";

function Security() {
  return (
    <>
      <div className="relative flex flex-col border border-accent/10 lg:text-left">
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="../images/illustrations/security-illustration-desktop.png"
            type="image/png"
          />
          <source
            media="(min-width: 768px)"
            srcSet="../images/illustrations/security-illustration-laptop.png"
            type="image/png"
          />
          <img
            className="aspect-4/3 w-screen object-cover md:max-h-[500px]"
            src="../images/illustrations/security-illustration-mobile.png"
            alt="two elderly person smiling"
          />
        </picture>
        <div className="bottom-0 left-0 flex flex-col gap-4 bg-background p-8 md:absolute xl:max-w-[85ch]">
          <h1 className="text-3xl font-medium lg:text-5xl">
            Empowering You with <span className="text-brand">Safety</span> and{" "}
            <span className="text-brand">Confidence</span>
          </h1>
          <p>
            Your security is more than just a feature—it’s our commitment. From
            secure logins to account alerts, we offer a range of tools to help
            you protect your accounts. Bank confidently with Yourbank, knowing
            your financial safety is always our priority
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-accent/10"></div>

      <div className="flex flex-col gap-8 lg:text-left">
        <div className="flex max-w-[80ch] flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            How We Protect Your Account
          </h2>
          <p>
            Our security team constantly monitors for potential threats and uses
            multiple layers of defense to safeguard your account and personal
            data.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start">
          {security.features.map((feature) => {
            return (
              <Fragment key={feature.title}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <div className="flex rounded-md border border-accent/10 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="34"
                        fill="currentColor"
                      >
                        <path d="M8.5 4.25A4.25 4.25 0 0 0 4.25 8.5v3.188a4.25 4.25 0 0 0 4.25 4.25h3.188a4.25 4.25 0 0 0 4.25-4.25V8.5a4.25 4.25 0 0 0-4.25-4.25H8.5zm13.813 0a4.25 4.25 0 0 0-4.25 4.25v3.188a4.25 4.25 0 0 0 4.25 4.25H25.5a4.25 4.25 0 0 0 4.25-4.25V8.5a4.25 4.25 0 0 0-4.25-4.25h-3.187zM8.5 18.063a4.25 4.25 0 0 0-4.25 4.25V25.5a4.25 4.25 0 0 0 4.25 4.25h3.188a4.25 4.25 0 0 0 4.25-4.25v-3.187a4.25 4.25 0 0 0-4.25-4.25H8.5zm16.469 1.062c0-.587-.476-1.062-1.063-1.062s-1.062.476-1.062 1.063v3.719h-3.719a1.06 1.06 0 0 0-1.062 1.062c0 .586.476 1.063 1.063 1.063h3.719v3.719c0 .587.476 1.063 1.062 1.063s1.063-.476 1.063-1.062v-3.719h3.719c.587 0 1.063-.476 1.063-1.063a1.06 1.06 0 0 0-1.062-1.062h-3.719v-3.719z" />
                      </svg>
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
            Security is a shared responsibility. From keeping your personal
            information private to double-checking suspicious links, these
            practices can help you maintain a secure banking experience.
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

export default Security;
