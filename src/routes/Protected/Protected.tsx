import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

function Protected() {
  const { session, isLoading } = useSession();

  if (isLoading) return <div>Loading...</div>;

  if (!session) {
    return <Navigate to="/login/" />;
  } else {
    return <Outlet />;
  }
}

export default Protected;
