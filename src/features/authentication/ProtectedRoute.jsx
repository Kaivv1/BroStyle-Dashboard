/* eslint-disable react/prop-types */
import { useUser } from "./useUser";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const isAuthenticated = user?.isAuthenticated;

  if (isLoading) return <Loader auth={true} />;
  if (!isLoading && !isAuthenticated) return navigate("/login");
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
