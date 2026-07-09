import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginPage from "./pages/Login/Login";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerDetailPage from "./pages/Customer/CustomerDetailPage";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";
import TicketPage from "./pages/Ticket/TicketPage";
import Analytics from "./pages/Analytics/Analytics";
import RegionalInsightsPage from "./pages/RegionalInsights/RegionalInsightsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/new"
            element={
              <ProtectedRoute>
                <CustomerCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute>
                <CustomerDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id/edit"
            element={
              <ProtectedRoute>
                <CustomerEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/regional-insights"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]}>
                <RegionalInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
