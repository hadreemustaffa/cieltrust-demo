// icons import
import DollarSignIcon from "../../images/icons/dollar-sign.svg?react";
import HeartIcon from "../../images/icons/heart.svg?react";
import ArchiveIcon from "../../images/icons/archive.svg?react";
import ClockIcon from "../../images/icons/clock.svg?react";

// components import
import FaqSection from "../../components/FaqSection";
import Icon from "../../components/Icon";
import JobOpenings from "../../components/JobOpenings";
import OpenAccountBanner from "../../components/OpenAccountBanner";
import Testimonials from "../../components/Testimonials";

function Careers() {
  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:text-left">
          <h1 className="basis-1/2 text-3xl font-medium lg:text-5xl">
            Challenge Yourself and <span className="text-brand">Transform</span>{" "}
            Banking
          </h1>
          <p className="basis-1/2">
            Step into a career where your talents and ambitions are truly
            valued. At CielTrust, we’re dedicated to creating meaningful
            financial experiences for our customers, and we’re looking for
            bright minds to help us lead the way. Here, you’ll grow
            professionally, gain invaluable insights, and play a key role in
            reshaping the future of banking.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <picture className="border border-accent/10">
            <source
              media="(min-width: 992px)"
              srcSet="../images/illustrations/careers-illustration-2-desktop.png"
              type="image/png"
            />
            <source
              media="(min-width: 576px)"
              srcSet="../images/illustrations/careers-illustration-2-laptop.png"
              type="image/png"
            />
            <img
              src="../images/illustrations/careers-illustration-2-mobile.png"
              className=""
              alt="A person being interviewed for a job"
              loading="lazy"
            />
          </picture>

          <picture className="border border-accent/10">
            <source
              media="(min-width: 992px)"
              srcSet="../images/illustrations/careers-illustration-desktop.png"
              type="image/png"
            />
            <source
              media="(min-width: 576px)"
              srcSet="../images/illustrations/careers-illustration-laptop.png"
              type="image/png"
            />
            <img
              src="../images/illustrations/careers-illustration-mobile.png"
              className=""
              alt="Group photo of office employees"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold">
            Our <span className="text-brand">Values</span>
          </h2>
          <p>
            At CielTrust, our values form the foundation of our organization and
            guide our actions. We believe in upholding the highest standards of
            integrity, delivering exceptional service, and embracing innovation.
            These values define our culture and shape the way we work together
            to achieve our goals.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Integrity</h3>
            <p>
              We conduct ourselves with utmost honesty, transparency, and
              ethical behavior. We believe in doing what is right for our
              customers, colleagues, and stakeholders, even when faced with
              difficult choices.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Customer Centricity</h3>
            <p>
              Our customers are at the heart of everything we do. We are
              dedicated to understanding their needs, providing personalized
              solutions, and delivering exceptional service that exceeds
              expectations.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Collaboration</h3>
            <p>
              We foster a collaborative and inclusive work environment, where
              teamwork and diversity are celebrated. By leveraging the unique
              strengths and perspectives of our employees, we drive innovation
              and achieve greater success together.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p>
              We embrace change and constantly seek innovative solutions to meet
              the evolving needs of our customers. We encourage our employees to
              think creatively, challenge conventions, and explore new ideas to
              drive the future of banking.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold">
            Our <span className="text-brand">Benefits</span>
          </h2>
          <p>
            At CielTrust, we value our employees and are dedicated to their
            well-being and success. We offer a comprehensive range of benefits
            designed to support their personal and professional growth.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <Icon SvgIcon={DollarSignIcon} />
              </div>
              <h3 className="text-xl font-semibold">
                Competitive Compensation
              </h3>
            </div>
            <p>
              We provide a competitive salary package that recognizes the skills
              and expertise of our employees. CielTrust believes in rewarding
              exceptional performance and offering opportunities for financial
              growth.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <Icon SvgIcon={HeartIcon} />
              </div>
              <h3 className="text-xl font-semibold">Health and Wellness</h3>
            </div>
            <p>
              We prioritize the health and well-being of our employees by
              providing comprehensive medical, dental, and vision insurance
              plans. We also offer wellness programs, gym memberships, and
              resources to support a healthy lifestyle.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <Icon SvgIcon={ArchiveIcon} />
              </div>
              <h3 className="text-xl font-semibold">Retirement Planning</h3>
            </div>
            <p>
              CielTrust is committed to helping employees plan for their future.
              We offer a retirement savings plan with a generous employer match
              to help them build a secure financial foundation for the long
              term.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <Icon SvgIcon={ClockIcon} />
              </div>
              <h3 className="text-xl font-semibold">Work-Life Balance</h3>
            </div>
            <p>
              We understand the importance of maintaining a healthy work-life
              balance. CielTrust offers flexible work arrangements, paid time
              off, parental leave, and other programs that support employees in
              managing their personal and professional commitments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <JobOpenings />
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <FaqSection />
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <Testimonials />
      </div>

      <OpenAccountBanner />
    </>
  );
}

export default Careers;
