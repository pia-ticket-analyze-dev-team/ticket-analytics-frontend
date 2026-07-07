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
import { useTickets } from "../../hooks/useTickets";
import { useIssueTopics } from "../../hooks/useIssueTopics";
import { useDepartments } from "../../hooks/useDepartments";
import { useRegions } from "../../hooks/useRegions";
import { useAgents } from "../../hooks/useAgents";
import { toApiDateTime } from "../../utils/date";
import {
  defaultTicketFilters,
  type DateRange,
  type Ticket,
  type TicketFilterState,
  type TicketUpdate,
} from "../../types/ticket";

const UNASSIGNED_SENTINEL_ID = "00000000-0000-0000-0000-000000000000";

const buildDefaultDateRange = (): DateRange => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date();
  start.setFullYear(start.getFullYear() - 5);
  start.setHours(0, 0, 0, 0);
  return { start, end };
};

const statusMap: Record<string, string> = {
  Open: "OPEN",
  "In Progress": "IN_PROGRESS",
  Resolved: "RESOLVED",
  Closed: "CLOSED",
};

type SortOrder = "asc" | "desc" | null;

const TicketPage = () => {
  const [filters, setFilters] = useState<TicketFilterState>(defaultTicketFilters);
  const [dateRange, setDateRange] = useState<DateRange>(buildDefaultDateRange);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [localOverrides, setLocalOverrides] = useState<Record<string, TicketUpdate>>({});
  const [localAssignments, setLocalAssignments] = useState<Record<string, string | null>>({});
  const [localDeletedIds, setLocalDeletedIds] = useState<Set<string>>(new Set());
  const [localAdditions, setLocalAdditions] = useState<Ticket[]>([]);

  const { data: issueTopics } = useIssueTopics();
  const { data: departments } = useDepartments();
  const { data: regions } = useRegions();
  const { data: agents } = useAgents();

  const topicId =
    filters.issueTopic === "All"
      ? undefined
      : issueTopics?.find((t) => t.name === filters.issueTopic)?.id;

  const departmentId =
    filters.department === "All"
      ? undefined
      : departments?.find((d) => d.name === filters.department)?.id;

  const regionId =
    filters.city === "All" ? undefined : regions?.find((r) => r.name === filters.city)?.id;

  const agentId =
    filters.assignedAgent === "All"
      ? undefined
      : filters.assignedAgent === "Unassigned"
        ? UNASSIGNED_SENTINEL_ID
        : agents?.find((a) => a.name === filters.assignedAgent)?.id;

  const slaBreached =
    filters.slaBreached === "All" ? undefined : filters.slaBreached === "Yes";

  const { data, loading, error } = useTickets({
    page: page - 1,
    size: rowsPerPage,
    status: filters.status === "All" ? undefined : statusMap[filters.status],
    priority: filters.priority === "All" ? undefined : filters.priority,
    topicId,
    departmentId,
    regionId,
    slaBreached,
    agentId,
    startDate: toApiDateTime(dateRange.start),
    endDate: toApiDateTime(dateRange.end),
  });

  const displayedTickets = useMemo(() => {
    const remote = (data?.content ?? [])
      .filter((ticket) => !localDeletedIds.has(ticket.id))
      .map((ticket) => {
        const override = localOverrides[ticket.id];
        const assignment = localAssignments[ticket.id];

        return {
          ...ticket,
          ...(override
            ? {
                issueTopicName: override.issueTopic,
                departmentName: override.department,
                city: override.city,
                priority: override.priority,
                status: override.status,
              }
            : {}),
          ...(ticket.id in localAssignments ? { assignedAgentName: assignment ?? null } : {}),
        };
      });

    const combined = [...localAdditions, ...remote];

    return sortOrder === "asc" ? [...combined].reverse() : combined;
  }, [data, localOverrides, localAssignments, localDeletedIds, localAdditions, sortOrder]);

  const totalEntries = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const rangeStart = totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(page * rowsPerPage, totalEntries);

  const handleFiltersChange = (next: TicketFilterState) => {
    setFilters(next);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(defaultTicketFilters);
    setDateRange(buildDefaultDateRange());
    setSortOrder(null);
    setPage(1);
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setPage(1);
  };

  const handleUpdateTicket = (ticketId: string, updates: TicketUpdate) => {
    setLocalOverrides((prev) => ({ ...prev, [ticketId]: updates }));
  };

  const handleDeleteTicket = (ticketId: string) => {
    setLocalDeletedIds((prev) => new Set(prev).add(ticketId));
  };

  const handleAssignTicket = (ticketId: string, agent: string | null) => {
    setLocalAssignments((prev) => ({ ...prev, [ticketId]: agent }));
  };

  const handleAddTicket = (input: NewTicketInput) => {
    const createdAt = new Date();

    const newTicket: Ticket = {
      id: `local-${createdAt.getTime()}`,
      ticketNumber: `LOCAL-${createdAt.getTime()}`,
      customerId: null,
      customerName: input.customer,
      topicId: null,
      issueTopicName: input.issueTopic,
      currentDepartmentId: null,
      departmentName: input.department,
      regionId: null,
      city: input.city,
      agentId: null,
      assignedAgentName: input.assignedAgent,
      serviceTypeId: null,
      serviceTypeName: null,
      infrastructureTypeId: null,
      infrastructureTypeName: null,
      description: input.description,
      status: input.status,
      priority: input.priority,
      slaBreached: input.priority === "High" && input.status === "OPEN",
      resolutionTimeHours: null,
      customerSatisfactionScore: null,
      createdAt: createdAt.toISOString(),
      resolvedAt: null,
      creationSource: "CALL_CENTER",
    };

    setLocalAdditions((prev) => [newTicket, ...prev]);
    setIsAddDialogOpen(false);
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
      />

      {error && (
        <Typography sx={{ fontSize: 13, color: "#d03b3b", mb: 1.5 }}>{error}</Typography>
      )}

      <TicketTable
        tickets={loading ? [] : displayedTickets}
        onUpdateTicket={handleUpdateTicket}
        onDeleteTicket={handleDeleteTicket}
        onAssignTicket={handleAssignTicket}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSort}
      />

      <TicketPagination
        page={page}
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
