import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>; // or your <Progress />

  if (!user) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;