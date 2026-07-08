import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleProtectedRoute from "./auth/RoleProtectedRoute";

import LoginPage from "./pages/Login/LoginPage";
import UnauthorizedPage from "./pages/Unauthorized/UnauthorizedPage";

import DashboardPage from "./pages/Dashboard/DashboardPage";

import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerDetailPage from "./pages/Customer/CustomerDetailPage";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";

import TicketPage from "./pages/Ticket/TicketPage";
import MyTicketsPage from "./pages/MyTickets/MyTicketsPage";

import RegionalInsightsPage from "./pages/RegionalInsights/RegionalInsightsPage";
import ChurnPage from "./pages/Churn/ChurnPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* ADMIN */}
            <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/regional-insights"
                element={<RegionalInsightsPage />}
              />
              <Route path="/churn-analysis" element={<ChurnPage />} />
            </Route>

            {/* ADMIN + FRONT OFFICE */}
            <Route
              element={
                <RoleProtectedRoute
                  allowedRoles={["ADMIN"]}
                  allowFrontOffice
                />
              }
            >
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/customers/new" element={<CustomerCreatePage />} />
              <Route path="/customers/:id" element={<CustomerDetailPage />} />
              <Route
                path="/customers/:id/edit"
                element={<CustomerEditPage />}
              />
              <Route path="/tickets" element={<TicketPage />} />
            </Route>

            {/* AGENT */}
            <Route element={<RoleProtectedRoute allowedRoles={["AGENT"]} />}>
              <Route path="/my-tickets" element={<MyTicketsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;