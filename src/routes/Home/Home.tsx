import { products } from "../../data/products";
import { features } from "../../data/features";

// icons import
import CheckCircleIcon from "../../images/icons/check-circle.svg?react";
import ClipboardIcon from "../../images/icons/clipboard.svg?react";
import ClockIcon from "../../images/icons/clock.svg?react";
import HomeIcon from "../../images/icons/home.svg?react";
import BookOpenIcon from "../../images/icons/book-open.svg?react";
import GlobeIcon from "../../images/icons/globe.svg?react";
import BarChartIcon from "../../images/icons/bar-chart.svg?react";
import ArrowUpIcon from "../../images/icons/arrow-up.svg?react";
import CreditCardIcon from "../../images/icons/credit-card.svg?react";

// components import
import {
  LinkButtonPrimary,
  LinkButtonSecondary,
} from "../../components/Button";
import Testimonials from "../../components/Testimonials";
import OpenAccountBanner from "../../components/OpenAccountBanner";
import FaqSection from "../../components/FaqSection";
import TabSection from "../../components/TabSection/TabSection";
import { TabSectionTitle } from "../../components/TabSection/TabSectionTitle";
import Icon from "../../components/Icon";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center gap-8 lg:items-start">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <p className="flex flex-row items-center gap-2 text-sm">
              <CheckCircleIcon />
              No LLC Required, No Credit Check.
            </p>

            <div className="flex max-w-prose flex-col gap-2 lg:items-start lg:gap-4 lg:text-left">
              <h1 className="text-3xl font-medium lg:text-5xl">
                Welcome to <span className="text-brand">Yourbank</span>
                <br />
                Empowering Your Financial Journey
              </h1>
              <p>
                At Yourbank, our mission is to provide comprehensive banking
                solutions that empower individuals and businesses to achieve
                their financial goals. We are committed to delivering
                personalized and innovative services that prioritize our
                customers&apos; needs.
              </p>
            </div>
          </div>

          <LinkButtonPrimary to="/yourbank-main/signup/">
            Open Account
          </LinkButtonPrimary>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <TabSection hasTitle isTablistWithTitle={true} data={products}>
          <TabSectionTitle>
            <h2 className="text-2xl font-semibold">
              Our <span className="text-brand">Products</span>
            </h2>
            <p>
              Discover a range of comprehensive and customizable banking
              products at Yourbank, designed to suit your unique financial needs
              and aspirations
            </p>
          </TabSectionTitle>
        </TabSection>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex max-w-prose flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold text-brand">Use Cases</h2>
          <p>
            At Yourbank, we cater to the diverse needs of individuals and
            businesses alike, offering a wide range of financial solutions
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 lg:grid xl:grid-cols-2">
            <div className="grid grid-cols-auto-fit-sm grid-rows-2 gap-4 rounded-md border border-accent/10 p-4 md:grid-cols-2">
              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={ClipboardIcon} />
                </div>
                <p>Managing Personal Finances</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={ClockIcon} />
                </div>
                <p>Saving for the Future</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={HomeIcon} />
                </div>
                <p>Homeownership</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={BookOpenIcon} />
                </div>
                <p>Education Funding</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:items-start lg:text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">For Individuals</h3>
                <p>
                  For individuals, our mortgage services pave the way to
                  homeownership, and our flexible personal loans provide vital
                  support during various life milestones. We also prioritize
                  retirement planning, ensuring a financially secure future for
                  our customers.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">78%</span>Secure
                  Retirement Planning
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">63%</span>Manageable Debt
                  Consolidation
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">91%</span>Reducing
                  financial burdens
                </p>
              </div>

              <LinkButtonSecondary to="#">Learn More</LinkButtonSecondary>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:grid xl:grid-cols-2">
            <div className="grid grid-cols-auto-fit-sm grid-rows-2 gap-4 rounded-md border border-accent/10 p-4 md:grid-cols-2 xl:order-1">
              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={GlobeIcon} />
                </div>
                <p>Startups and Entrepreneurs</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={BarChartIcon} />
                </div>
                <p>Cash Flow Management</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={ArrowUpIcon} />
                </div>
                <p>Business Expansion</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-2">
                  <Icon SvgIcon={CreditCardIcon} />
                </div>
                <p>Payment Solutions</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:items-start lg:text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">For Business</h3>
                <p>
                  For businesses, we empower growth with working capital
                  solutions that optimize cash flow, and our tailored financing
                  options fuel business expansion. Whatever your financial
                  aspirations, Yourbank is committed to providing the right
                  tools and support to achieve them.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">65%</span>Cash Flow
                  Management
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">70%</span>Drive Business
                  Expansion
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">45%</span>Streamline
                  payroll processing
                </p>
              </div>

              <LinkButtonSecondary to="#">Learn More</LinkButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <TabSection hasTitle isTablistWithTitle={false} data={features}>
          <TabSectionTitle>
            <h2 className="text-2xl font-semibold">
              Our <span className="text-brand">Features</span>
            </h2>
            <p>
              Experience a host of powerful features at Yourbank, including
              seamless online banking, secure transactions, and personalized
              financial insights, all designed to enhance your banking
              experience
            </p>
          </TabSectionTitle>
        </TabSection>
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
