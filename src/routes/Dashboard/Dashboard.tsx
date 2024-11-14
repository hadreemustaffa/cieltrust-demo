import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useAuth } from "../../context/AuthProvider";

function Dashboard() {
  return (
    <div className="flex flex-col gap-8 rounded-md border border-accent/10 p-8">
      <AccountOverview />
    </div>
  );
}

export default Dashboard;
