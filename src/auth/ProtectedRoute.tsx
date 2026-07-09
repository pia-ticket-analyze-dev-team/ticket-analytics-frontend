import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({
  children,
  blockDepartmentCodes,
}: {
  children: ReactNode;
  blockDepartmentCodes?: string[];
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

  return <>{children}</>;
};

export default ProtectedRoute;
