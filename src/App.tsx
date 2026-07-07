import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerDetailPage from "./pages/Customer/CustomerDetailPage";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";
import TicketPage from "./pages/Ticket/TicketPage";
import RegionalInsightsPage from "./pages/RegionalInsights/RegionalInsightsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tickets" element={<TicketPage />} />

        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/customers/new" element={<CustomerCreatePage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route
          path="/customers/:id/edit"
          element={<CustomerEditPage />}
        />

        <Route
          path="/regional-insights"
          element={<RegionalInsightsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;