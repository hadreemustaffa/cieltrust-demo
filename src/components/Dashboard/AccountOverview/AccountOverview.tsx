import BalanceSummary from "./BalanceSummary";

function AccountOverview() {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-accent/10 p-4 text-left">
      <BalanceSummary />
    </div>
  );
}

export default AccountOverview;
