import CreditCardIcon from "../images/icons/credit-card.svg?react";
import PocketIcon from "../images/icons/pocket.svg?react";
import DollarSignIcon from "../images/icons/dollar-sign.svg?react";
import BriefcaseIcon from "../images/icons/briefcase.svg?react";
import ShieldIcon from "../images/icons/shield.svg?react";
import TrendingUpIcon from "../images/icons/trending-up.svg?react";

export const products = [
  {
    name: "Individuals",
    list: [
      {
        title: "Checking Accounts",
        description:
          "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.",
        icon: CreditCardIcon,
      },
      {
        title: "Savings Accounts",
        description:
          "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
        icon: PocketIcon,
      },
      {
        title: "Loans and Mortgages",
        description:
          "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.",
        icon: DollarSignIcon,
      },
    ],
  },
  {
    name: "Businesses",
    list: [
      {
        title: "Business Savings Accounts",
        description:
          "Manage your business finances effortlessly with our Business Checking Accounts. Enjoy seamless access to your funds, with features like online banking, free debit cards, and 24/7 support to help you stay on top of transactions and cash flow—whether you’re a startup or a growing enterprise.",
        icon: BriefcaseIcon,
      },
      {
        title: "Insurance Products",
        description:
          "Protect your business and secure peace of mind with our tailored Insurance Products. From liability and property insurance to employee coverage, we offer a range of solutions to safeguard your business from unexpected events. With flexible plans and comprehensive support, you can focus on growing your business while we handle the rest.",
        icon: ShieldIcon,
      },
      {
        title: "Commercial Loans",
        description:
          "Fuel your business growth with our flexible Commercial Loans. Whether you're looking to expand operations, purchase new equipment, or invest in real estate, we offer tailored loan options to meet your unique needs. With competitive rates, personalized support, and quick approvals, we’re here to help turn your business ambitions into reality.",
        icon: TrendingUpIcon,
      },
    ],
  },
];
