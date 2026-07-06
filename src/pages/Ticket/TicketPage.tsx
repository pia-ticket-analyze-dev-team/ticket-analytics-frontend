import { useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../../components/Layout/MainLayout";
import TicketFilters from "../../components/Ticket/TicketFilters";
import TicketTable from "../../components/Ticket/TicketTable";
import TicketPagination from "../../components/Ticket/TicketPagination";
import AddTicketDialog, {
  type NewTicketInput,
} from "../../components/Ticket/AddTicketDialog";
import { mockTickets } from "../../data/mockTickets";
import {
  defaultTicketFilters,
  type DateRange,
  type Ticket,
  type TicketFilterState,
  type TicketUpdate,
} from "../../types/ticket";

const defaultDateRange: DateRange = {
  start: new Date(2024, 5, 1),
  end: new Date(2024, 5, 30, 23, 59, 59),
};

const generateTicketNo = (existing: Ticket[]) => {
  const maxNum = existing.reduce((max, ticket) => {
    const num = parseInt(ticket.ticketNo.split("-").pop() ?? "0", 10);
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 0);
  return `TCKT-2024-${String(maxNum + 1).padStart(4, "0")}`;
};

const statusMap: Record<string, string> = {
  Open: "OPEN",
  "In Progress": "IN_PROGRESS",
  Resolved: "RESOLVED",
  Closed: "CLOSED",
};

const priorityMap: Record<string, string> = {
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
};

type SortOrder = "asc" | "desc" | null;

const TicketPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [filters, setFilters] = useState<TicketFilterState>(defaultTicketFilters);
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (filters.status !== "All" && ticket.status !== statusMap[filters.status]) {
        return false;
      }
      if (filters.priority !== "All" && ticket.priority !== priorityMap[filters.priority]) {
        return false;
      }
      if (filters.issueTopic !== "All" && ticket.issueTopic !== filters.issueTopic) {
        return false;
      }
      if (filters.department !== "All" && ticket.department !== filters.department) {
        return false;
      }
      if (filters.city !== "All" && ticket.city !== filters.city) {
        return false;
      }
      if (filters.slaBreached !== "All") {
        const wantsBreached = filters.slaBreached === "Yes";
        if (ticket.slaBreached !== wantsBreached) return false;
      }
      if (ticket.createdAt < dateRange.start || ticket.createdAt > dateRange.end) {
        return false;
      }
      return true;
    });
  }, [tickets, filters, dateRange]);

  const sortedTickets = useMemo(() => {
    if (!sortOrder) return filteredTickets;

    return [...filteredTickets].sort((a, b) =>
      sortOrder === "asc"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [filteredTickets, sortOrder]);

  const totalEntries = sortedTickets.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const rangeStart = totalEntries === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(safePage * rowsPerPage, totalEntries);

  const paginatedTickets = sortedTickets.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage
  );

  const handleFiltersChange = (next: TicketFilterState) => {
    setFilters(next);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(defaultTicketFilters);
    setDateRange(defaultDateRange);
    setSortOrder(null);
    setPage(1);
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
    setPage(1);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setPage(1);
  };

  const handleUpdateTicket = (ticketNo: string, updates: TicketUpdate) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.ticketNo === ticketNo ? { ...ticket, ...updates } : ticket))
    );
  };

  const handleDeleteTicket = (ticketNo: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.ticketNo !== ticketNo));
  };

  const handleAssignTicket = (ticketNo: string, agent: string | null) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.ticketNo === ticketNo ? { ...ticket, assignedAgent: agent } : ticket
      )
    );
  };

  const handleAddTicket = (input: NewTicketInput) => {
    const createdAt = new Date();

    const newTicket: Ticket = {
      ticketNo: generateTicketNo(tickets),
      customer: input.customer,
      issueTopic: input.issueTopic,
      department: input.department,
      city: input.city,
      priority: input.priority,
      status: input.status,
      slaBreached: input.priority === "HIGH" && input.status === "OPEN",
      createdAt,
      assignedAgent: input.assignedAgent,
    };

    setTickets((prev) => [newTicket, ...prev]);

    if (createdAt > dateRange.end) {
      setDateRange((prev) => ({ ...prev, end: createdAt }));
    }

    setIsAddDialogOpen(false);
    setPage(1);
  };

  const handleExport = () => {
    console.log("Exporting tickets", filteredTickets);
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
            Tickets
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#9CA3AF", mt: 0.5 }}>
            Dashboard / Tickets
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddDialogOpen(true)}
          sx={{
            backgroundColor: "#2463FF",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: "8px",
            px: 2.5,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1E53E5",
              boxShadow: "none",
            },
          }}
        >
          Add Ticket
        </Button>
      </Box>

      <TicketFilters
        filters={filters}
        onChange={handleFiltersChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onClear={handleClearFilters}
        onExport={handleExport}
      />

      <TicketTable
        tickets={paginatedTickets}
        onUpdateTicket={handleUpdateTicket}
        onDeleteTicket={handleDeleteTicket}
        onAssignTicket={handleAssignTicket}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSort}
      />

      <TicketPagination
        page={safePage}
        totalPages={totalPages}
        totalEntries={totalEntries}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(next) => {
          setRowsPerPage(next);
          setPage(1);
        }}
      />

      <AddTicketDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddTicket}
      />
    </MainLayout>
  );
};

export default TicketPage;
