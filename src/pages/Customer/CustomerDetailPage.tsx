import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import MainLayout from "../../components/Layout/MainLayout";

import CustomerDetailHeader from "../../components/Customer/Detail/CustomerDetailHeader";
import CustomerOverview from "../../components/Customer/Detail/CustomerOverview";
import CustomerTicketTable from "../../components/Customer/Detail/CustomerTicketTable";

import TicketPagination from "../../components/Ticket/TicketPagination";
import { useCustomer } from "../../hooks/useCustomer";

const tickets = [
  {
    id: "TCKT-2004-0001",
    issue: "İnternet Bağlantı Sorunu",
    status: "OPEN",
    priority: "HIGH",
    department: "Technical Support",
    createdAt: "12.06.2024 10:15",
  },
  {
    id: "TCKT-2004-0002",
    issue: "Fatura İtirazı",
    status: "RESOLVED",
    priority: "MEDIUM",
    department: "Billing",
    createdAt: "13.06.2024 14:30",
  },
  {
    id: "TCKT-2004-0003",
    issue: "Hız Problemi",
    status: "IN_PROGRESS",
    priority: "HIGH",
    department: "Technical Support",
    createdAt: "14.06.2024 09:20",
  },
  {
    id: "TCKT-2004-0004",
    issue: "Modem Arızası",
    status: "RESOLVED",
    priority: "LOW",
    department: "Field Operations",
    createdAt: "15.06.2024 11:45",
  },
  {
    id: "TCKT-2004-0005",
    issue: "Nakil İşlemleri",
    status: "CLOSED",
    priority: "LOW",
    department: "Customer Services",
    createdAt: "16.06.2024 16:10",
  },
];

const CustomerDetailPage = () => {
  const { id } = useParams();
  const { data: customer, loading, error } = useCustomer(id);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const paginatedTickets = tickets.slice(start, end);

  return (
    <MainLayout>
      <CustomerDetailHeader />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && error && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && customer && (
        <>
          <CustomerOverview customer={customer} />

          <CustomerTicketTable tickets={paginatedTickets} />

          <TicketPagination
            page={page}
            totalPages={Math.ceil(tickets.length / rowsPerPage)}
            totalEntries={tickets.length}
            rangeStart={tickets.length === 0 ? 0 : start + 1}
            rangeEnd={Math.min(end, tickets.length)}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
          />
        </>
      )}
    </MainLayout>
  );
};

export default CustomerDetailPage;
