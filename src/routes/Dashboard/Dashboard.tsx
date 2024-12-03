import { useLoaderData } from "react-router";
import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";
import supabase from "../../utils/supabase";
import { deleteUser } from "../../actions/delete";
import SavingGoals from "../../components/Dashboard/SavingGoals/SavingGoals";

export async function dashboardLoader() {
  const { data, error } = await supabase
    .from("dashboard")
    .select("id")
    .single();

  if (error) {
    console.log(error);
  }

  if (data) {
    return data;
  }
}

export default function Dashboard() {
  let loaderData = useLoaderData() as { id: number };

  const { session } = useSession();

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview dashboardId={loaderData.id} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <SavingGoals dashboardId={loaderData.id} />
      </div>
    </div>
  );
}
