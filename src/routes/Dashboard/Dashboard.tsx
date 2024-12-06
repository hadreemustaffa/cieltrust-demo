import { useLoaderData } from "react-router";
import AccountOverview from "../../components/Dashboard/AccountOverview/AccountOverview";
import { useSession } from "../../context/SessionContext";
import supabase from "../../utils/supabase";
import { deleteUser } from "../../actions/delete";
import SavingGoals from "../../components/Dashboard/SavingGoals/SavingGoals";
import Budget from "../../components/Dashboard/Budget/Budget";

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
  let data = useLoaderData() as { id: number };

  const { session } = useSession();

  return (
    <div className="flex flex-col gap-4 text-left">
      <AccountOverview dashboardId={data.id} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-4">
          <SavingGoals dashboardId={data.id} />
          <Budget dashboardId={data.id} />
        </div>
      </div>
    </div>
  );
}
