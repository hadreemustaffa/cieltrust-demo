import { redirect } from "react-router";
import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";
import supabase from "../../utils/supabase";
import { deleteUser } from "../../actions/delete";

function Dashboard() {
  const { session } = useSession();

  const handleDeleteUser = async () => {
    deleteUser()
      .then(() => {
        alert("Account deleted successfully!");
      })
      .finally(async () => {
        await supabase.auth.signOut();
        redirect("/");
      });
  };

  return (
    <div className="flex flex-col gap-8 rounded-md border border-accent/10 p-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-medium lg:text-5xl">
          Welcome, {session?.user.user_metadata.first_name}
        </h1>
        <button
          onClick={handleDeleteUser}
          className="rounded-md bg-red-600 p-2 hover:bg-red-500"
        >
          Delete Account
        </button>
      </div>
      <AccountOverview />
    </div>
  );
}

export default Dashboard;
