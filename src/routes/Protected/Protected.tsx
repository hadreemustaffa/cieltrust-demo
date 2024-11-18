import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

function Protected() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/login/" />;
  } else {
    return <Outlet />;
  }
}

export default Protected;
