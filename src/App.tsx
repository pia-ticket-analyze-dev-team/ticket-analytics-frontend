import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerDetailPage from "./pages/Customer/CustomerDetailPage";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";

import RegionalInsightsPage from "./pages/RegionalInsights/RegionalInsightsPage";
import TicketPage from "./pages/Ticket/TicketPage";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />

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
  );
}

export default App;