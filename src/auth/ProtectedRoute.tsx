import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  blockDepartmentCodes?: string[];
  blockOtherAgents?: boolean;
}

const ProtectedRoute = ({
  children,
  blockDepartmentCodes,
  blockOtherAgents,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // FRONT kullanıcılarının giremeyeceği sayfalar
  if (
    blockDepartmentCodes &&
    user.departmentCode &&
    blockDepartmentCodes.includes(user.departmentCode)
  ) {
    return <Navigate to="/customers" replace />;
  }

  // FRONT dışındaki agentlar sadece My Tickets görebilir
  if (
    blockOtherAgents &&
    user.departmentCode !== null &&
    user.departmentCode !== "FRONT"
  ) {
    return <Navigate to="/my-tickets" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
