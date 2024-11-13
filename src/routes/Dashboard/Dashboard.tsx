import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";

function Dashboard() {
  return (
    <div className="flex flex-col gap-8 rounded-md border border-accent/10 p-8">
      <AccountOverview />
    </div>
  );
}

export default Dashboard;
