// icons import
import CreditCardIcon from "../../../images/icons/credit-card.svg?react";
import PocketIcon from "../../../images/icons/pocket.svg?react";

// components import
import Icon from "../../Icon";

function BalanceSummary() {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Balance Summary</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <Icon
              SvgIcon={CreditCardIcon}
              width={16}
              height={16}
              isBorderless
            />
            <p className="font-medium">Checking</p>
          </div>
          <p>$10,000</p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <Icon SvgIcon={PocketIcon} width={16} height={16} isBorderless />
            <p className="font-medium">Savings</p>
          </div>
          <p>$5,250</p>
        </div>
      </div>
    </>
  );
}

export default BalanceSummary;
