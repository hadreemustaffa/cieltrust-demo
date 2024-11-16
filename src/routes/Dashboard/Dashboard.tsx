import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";

function Dashboard() {
  const { session } = useSession();

  return (
    <div className="flex flex-col gap-8 rounded-md border border-accent/10 p-8">
      <h1 className="text-3xl font-medium lg:text-5xl">
        Welcome, {session?.user.user_metadata.first_name}
      </h1>
      <AccountOverview />
    </div>
  );
}

export default Dashboard;
