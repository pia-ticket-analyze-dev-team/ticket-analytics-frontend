import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { UserRole } from "./auth.types";

interface Props {
  allowedRoles: UserRole[];
  allowFrontOffice?: boolean;
}

const RoleProtectedRoute = ({
  allowedRoles,
  allowFrontOffice = false,
}: Props) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin
  if (user.agentId === null) {
    if (allowedRoles.includes("ADMIN")) {
      return <Outlet />;
    }

    return <Navigate to="/unauthorized" replace />;
  }

  // Front Office
  if (user.departmentCode === "FRONT") {
    if (
      allowFrontOffice ||
      allowedRoles.includes("AGENT")
    ) {
      return <Outlet />;
    }

    return <Navigate to="/unauthorized" replace />;
  }

  // Department Agent
  if (allowedRoles.includes("AGENT")) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default RoleProtectedRoute;