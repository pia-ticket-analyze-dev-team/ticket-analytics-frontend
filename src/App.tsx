import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerDetailPage from "./pages/Customer/CustomerDetailPage";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";

import RegionalInsightsPage from "./pages/RegionalInsights/RegionalInsightsPage";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;