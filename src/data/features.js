import ClockIcon from "../images/icons/clock.svg?react";
import LockIcon from "../images/icons/lock.svg?react";
import SendIcon from "../images/icons/send.svg?react";
import BellIcon from "../images/icons/bell.svg?react";
import PieChartIcon from "../images/icons/pie-chart.svg?react";
import TargetIcon from "../images/icons/target.svg?react";
import TrendingUpIcon from "../images/icons/trending-up.svg?react";
import HeartIcon from "../images/icons/heart.svg?react";
import MessageCircleIcon from "../images/icons/message-circle.svg?react";
import PhoneCallIcon from "../images/icons/phone-call.svg?react";
import UserCheckIcon from "../images/icons/user-check.svg?react";
import HelpCircleIcon from "../images/icons/help-circle.svg?react";

export const features = [
  {
    name: "Online Banking",
    list: [
      {
        title: "24/7 Account Access",
        description:
          "Enjoy round-the-clock access to your accounts. Check balances, review transactions, and manage your funds whenever it’s convenient for you.",
        icon: ClockIcon,
      },
      {
        title: "Secure Transactions",
        description:
          "Bank with confidence. Our secure platform uses advanced encryption to protect your data and ensure safe, worry-free transactions.",
        icon: LockIcon,
      },
      {
        title: "Bill Pay and Transfers",
        description:
          "Handle all your payments and transfers in one place. Pay bills, send money, and transfer funds between accounts with just a few clicks.",
        icon: SendIcon,
      },
      {
        title: "Custom Alerts & Notifications",
        description:
          "Stay informed about your account activity. Set up personalized alerts to receive notifications on transactions, low balances, and more, keeping you updated in real-time.",
        icon: BellIcon,
      },
    ],
  },
  {
    name: "Financial Tools",
    list: [
      {
        title: "Budgeting & Expense Tracking",
        description:
          "Monitor your spending and set budgets that suit your lifestyle. Track expenses across categories to stay within your budget and manage your money effectively.",

        icon: PieChartIcon,
      },
      {
        title: "Savings Goals",
        description:
          "Set, track, and achieve your financial goals. Whether saving for a big purchase or building an emergency fund, our tools provide a clear roadmap to reach your target.",

        icon: TargetIcon,
      },
      {
        title: "Investment Insights",
        description:
          "Make informed investment decisions with personalized insights and recommendations. Our tools provide guidance on investment options that align with your financial objectives.",

        icon: TrendingUpIcon,
      },
      {
        title: "Financial Health Score",
        description:
          "Get a snapshot of your overall financial health. Our tool evaluates your financial habits and provides actionable tips to help you improve and achieve financial wellness.",

        icon: HeartIcon,
      },
    ],
  },
  {
    name: "Customer Support",
    list: [
      {
        title: "Live Chat Support",
        description:
          "Connect instantly with our support team for real-time assistance. Our live chat feature allows you to get help with any questions or issues right from your dashboard.",

        icon: MessageCircleIcon,
      },
      {
        title: "24/7 Helpline",
        description:
          "Get support anytime through our 24/7 helpline. Whether it’s day or night, we’re available to assist with any banking needs or emergencies you may encounter.",

        icon: PhoneCallIcon,
      },
      {
        title: "Personalized Assistance",
        description:
          "Receive customized support for complex issues or specific needs. Our team takes the time to understand your situation and provide the best solutions tailored to you.",

        icon: UserCheckIcon,
      },
      {
        title: "Help Center & FAQs",
        description:
          "Find answers to common questions in our comprehensive Help Center. From quick fixes to detailed guides, our resources are designed to make banking simpler.",

        icon: HelpCircleIcon,
      },
    ],
  },
];
