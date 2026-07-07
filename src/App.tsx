import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/customers/new" element={<CustomerCreatePage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route
          path="/customers/:id/edit"
          element={<CustomerEditPage />}
        />

        <Route path="/tickets" element={<TicketPage />} />

        <Route path="/my-tickets" element={<MyTicketsPage />} />

        <Route
          path="/regional-insights"
          element={<RegionalInsightsPage />}
        />

        <Route
          path="/churn-analysis"
          element={<ChurnPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;