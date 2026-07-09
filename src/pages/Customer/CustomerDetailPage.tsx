import { useState } from "react";
import { useParams } from "react-router-dom";

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

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: stats } = useCustomerTicketStats(id, refreshKey);

  const { data: ticketsData } = useCustomerTickets(id, {
    page: page - 1,
    size: rowsPerPage,
    refreshKey,
  });

  if (loading) return null;
  if (error || !customer) return null;

  const totalEntries = ticketsData?.totalElements ?? 0;

  const rangeStart =
    totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;

  const rangeEnd = Math.min(
    page * rowsPerPage,
    totalEntries
  );

  return (
    <MainLayout>
      <CustomerDetailHeader />

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
        onDeleted={() => setRefreshKey((k) => k + 1)}
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
    </MainLayout>
  );
};

export default CustomerDetailPage;
