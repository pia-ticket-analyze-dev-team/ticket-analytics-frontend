import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({
  children,
  blockDepartmentCodes,
  blockOtherAgents,
}: {
  children: ReactNode;
  blockDepartmentCodes?: string[];
  blockOtherAgents?: boolean;
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    blockDepartmentCodes &&
    user.departmentCode &&
    blockDepartmentCodes.includes(user.departmentCode)
  ) {
    return <Navigate to="/customers" replace />;
  }

  if (blockOtherAgents && user.agentId && user.departmentCode !== "FRONT") {
    return <Navigate to="/my-tickets" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
