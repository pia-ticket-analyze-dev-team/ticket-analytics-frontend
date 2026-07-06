import { Navigate, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/Customer/CustomerPage";
import TicketPage from "./pages/Ticket/TicketPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" replace />} />
      <Route path="/tickets" element={<TicketPage />} />
      <Route path="/customers" element={<CustomerPage />} />
    </Routes>
  );
}

export default App;
