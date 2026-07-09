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
import MyTicketsPage from "./pages/MyTickets/MyTicketsPage";
import ChurnPage from "./pages/Churn/ChurnPage";

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
              <ProtectedRoute blockDepartmentCodes={["FRONT"]} blockOtherAgents>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute blockOtherAgents>
                <TicketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute>
                <MyTicketsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute blockOtherAgents>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/new"
            element={
              <ProtectedRoute blockOtherAgents>
                <CustomerCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute blockOtherAgents>
                <CustomerDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id/edit"
            element={
              <ProtectedRoute blockOtherAgents>
                <CustomerEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/regional-insights"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]} blockOtherAgents>
                <RegionalInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]} blockOtherAgents>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-churn-risk"
            element={
              <ProtectedRoute blockDepartmentCodes={["FRONT"]} blockOtherAgents>
                <ChurnPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
