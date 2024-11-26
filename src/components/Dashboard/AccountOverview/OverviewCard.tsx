// icons import
import CreditCardIcon from "../../../images/icons/credit-card.svg?react";
import TrendingUpIcon from "../../../images/icons/trending-up.svg?react";

// components import
import Icon from "../../Icon";

interface OverviewCardProps {
  title: string;
  amount: number;
  prevAmount: number;
  percentage: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  amount,
  prevAmount,
  percentage,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-col justify-between gap-2 text-left">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon
                SvgIcon={CreditCardIcon}
                width={16}
                height={16}
                isBorderless
              />
              <p className="text-sm">{title}</p>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-sm bg-green-800 px-2 py-1 text-xs text-green-400">
              <p className="">+{percentage}%</p>
              <Icon
                SvgIcon={TrendingUpIcon}
                width={16}
                height={16}
                isBorderless
              />
            </div>
          </div>
          <p className="text-2xl font-bold">$ {amount}</p>
        </div>
        <div className="h-[1px] w-full bg-accent/10"></div>
        <p className="text-sm">
          Last month: <span className="font-semibold">$ {prevAmount}</span>
        </p>
      </div>
    </>
  );
};

export default OverviewCard;
