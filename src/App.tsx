import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CustomerPage from "./pages/Customer/CustomerPage";
import TicketPage from "./pages/Ticket/TicketPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tickets" element={<TicketPage />} />
      <Route path="/customers" element={<CustomerPage />} />
    </Routes>
  );
}

export default App;
