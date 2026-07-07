import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import MainLayout from "../../components/Layout/MainLayout";

import CustomerDetailHeader from "../../components/Customer/Detail/CustomerDetailHeader";
import CustomerOverview from "../../components/Customer/Detail/CustomerOverview";
import CustomerTicketTable from "../../components/Customer/Detail/CustomerTicketTable";

import TicketPagination from "../../components/Ticket/TicketPagination";
import { useCustomer } from "../../hooks/useCustomer";
import { useCustomerTickets } from "../../hooks/useCustomerTickets";
import { useCustomerTicketStats } from "../../hooks/useCustomerTicketStats";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const { data: customer, loading, error } = useCustomer(id);
  const { data: stats } = useCustomerTicketStats(id);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: ticketsData,
    loading: ticketsLoading,
    error: ticketsError,
  } = useCustomerTickets(id, { page: page - 1, size: rowsPerPage });

  const totalEntries = ticketsData?.totalElements ?? 0;
  const rangeStart = totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(page * rowsPerPage, totalEntries);

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
          <CustomerOverview
            customer={customer}
            stats={
              stats ?? {
                totalTickets: 0,
                openTickets: 0,
                slaBreachCount: 0,
                averageSatisfactionScore: 0,
              }
            }
          />

          <CustomerTicketTable
            tickets={ticketsData?.content ?? []}
            loading={ticketsLoading}
            error={ticketsError}
          />

          <TicketPagination
            page={page}
            totalPages={ticketsData?.totalPages ?? 0}
            totalEntries={totalEntries}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
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
