import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useAgentTickets } from "../../hooks/useAgentTickets";
import TicketPagination from "../Ticket/TicketPagination";

import type {
  MyTicket,
  TicketPriority,
  TicketStatus,
} from "./myTickets.types";
import type { Ticket } from "../../types/ticket";

import { departmentAgents } from "../../data/mockAgents";

import EditablePriority from "./EditablePriority";
import EditableStatus from "./EditableStatus";
import EditableActions from "./EditableActions";
import AssignmentHistoryDialog from "./AssignmentHistoryDialog";

type Props = {
  search: string;
  status: string;
  priority: string;
};

const departments = [
  "Front Office",
  "Technical Support",
  "Billing",
  "Network Operations",
  "SIM Operations",
  "Retail Support",
];

const statusToApi: Record<string, string | undefined> = {
  All: undefined,
  Open: "OPEN",
  "In Progress": "IN_PROGRESS",
  Resolved: "RESOLVED",
  Closed: "CLOSED",
};

const apiStatusToDisplay: Record<string, TicketStatus> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
};

const formatSla = (ticket: Ticket) => {
  switch (ticket.slaStatus) {
    case "COMPLETED":
      return "Completed";
    case "BREACHED":
      return "Breached";
    case "ON_TRACK":
      return ticket.slaHoursRemaining != null ? `${ticket.slaHoursRemaining}h Left` : "On Track";
    default:
      return ticket.slaBreached ? "Breached" : "-";
  }
};

const toMyTicket = (ticket: Ticket): MyTicket => ({
  id: ticket.id,
  ticketNo: ticket.ticketNumber,
  customer: ticket.customerName ?? "Unknown",
  topic: ticket.issueTopicName ?? "-",
  priority: (ticket.priority as TicketPriority) ?? "Medium",
  status: apiStatusToDisplay[ticket.status] ?? "Open",
  createdAt: formatDate(ticket.createdAt),
  sla: formatSla(ticket),
  forwardedTo: ticket.departmentName ?? "-",
  assignedAgent: ticket.assignedAgentName ?? "-",
  assignmentHistory: [],
});

const MyTicketsTable = ({ search, status, priority }: Props) => {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, loading, error } = useAgentTickets({
    agentId: user?.agentId ?? null,
    page: page - 1,
    size: rowsPerPage,
    status: statusToApi[status],
    priority: priority === "All" ? undefined : priority,
  });

  const baseTickets = useMemo(() => (data?.content ?? []).map(toMyTicket), [data]);

  const [overrides, setOverrides] = useState<Record<string, Partial<MyTicket>>>({});

  const tickets = useMemo(
    () => baseTickets.map((ticket) => ({ ...ticket, ...overrides[ticket.id] })),
    [baseTickets, overrides]
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTicket, setEditedTicket] = useState<MyTicket | null>(null);
  const [historyTicket, setHistoryTicket] = useState<MyTicket | null>(null);
  const [forwardTicket, setForwardTicket] = useState<MyTicket | null>(null);
  const [forwardAnchor, setForwardAnchor] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticketNo.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const totalEntries = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const rangeStart = totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(page * rowsPerPage, totalEntries);

  const handleEdit = (ticket: MyTicket) => {
    setEditingId(ticket.id);
    setEditedTicket({ ...ticket });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedTicket(null);
  };

  const handleSave = () => {
    if (!editedTicket) return;

    setOverrides((prev) => ({
      ...prev,
      [editedTicket.id]: {
        ...prev[editedTicket.id],
        priority: editedTicket.priority,
        status: editedTicket.status,
      },
    }));

    setEditingId(null);
    setEditedTicket(null);
  };

  const openForwardMenu = (
    event: React.MouseEvent<HTMLElement>,
    ticket: MyTicket
  ) => {
    setForwardAnchor(event.currentTarget);
    setForwardTicket(ticket);
  };

  const handleForward = (department: string) => {
    if (!forwardTicket) return;

    const agents = departmentAgents[department] ?? [];
    if (agents.length === 0) return;

    const randomAgent = agents[Math.floor(Math.random() * agents.length)];

    setOverrides((prev) => ({
      ...prev,
      [forwardTicket.id]: {
        ...prev[forwardTicket.id],
        forwardedTo: department,
        assignedAgent: randomAgent,
        assignmentHistory: [
          ...forwardTicket.assignmentHistory,
          {
            department,
            agent: randomAgent,
            changedAt: new Date().toLocaleString(),
          },
        ],
      },
    }));

    setSnackbarMessage(
      `Ticket successfully forwarded to ${department} and assigned to ${randomAgent}.`
    );

    setSnackbarOpen(true);
    setForwardAnchor(null);
    setForwardTicket(null);
  };

  if (!user?.agentId) {
    return (
      <Paper
        sx={{
          mt: 3,
          borderRadius: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,.06)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          This page is only available to logged-in agents.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,.06)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
              <TableCell sx={{ fontWeight: 700 }}>Ticket No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Topic</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>SLA</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Forwarded To</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, width: 150 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !error &&
              filteredTickets.map((ticket) => {
                const isEditing = editingId === ticket.id;

                return (
                  <TableRow key={ticket.id} hover>
                    <TableCell>{ticket.ticketNo}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>{ticket.topic}</TableCell>
                    <TableCell sx={{ width: 180 }}>
                      <EditablePriority
                        value={
                          isEditing && editedTicket
                            ? editedTicket.priority
                            : ticket.priority
                        }
                        editing={isEditing}
                        onChange={(value: TicketPriority) =>
                          setEditedTicket((prev) =>
                            prev ? { ...prev, priority: value } : prev
                          )
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ width: 180 }}>
                      <EditableStatus
                        value={
                          isEditing && editedTicket
                            ? editedTicket.status
                            : ticket.status
                        }
                        editing={isEditing}
                        onChange={(value: TicketStatus) =>
                          setEditedTicket((prev) =>
                            prev ? { ...prev, status: value } : prev
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{ticket.createdAt}</TableCell>
                    <TableCell>{ticket.sla}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2463EB" }}>
                      {ticket.forwardedTo}
                    </TableCell>
                    <TableCell align="center">
                      <EditableActions
                        editing={isEditing}
                        onView={() => setHistoryTicket(ticket)}
                        onEdit={() => handleEdit(ticket)}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onForward={(e) => openForwardMenu(e, ticket)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

            {!loading && !error && filteredTickets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                  sx={{
                    py: 4,
                    color: "#6B7280",
                  }}
                >
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

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
      </TableContainer>

      <AssignmentHistoryDialog
        open={Boolean(historyTicket)}
        ticket={historyTicket}
        onClose={() => setHistoryTicket(null)}
      />

      <Menu
        anchorEl={forwardAnchor}
        open={Boolean(forwardAnchor)}
        onClose={() => {
          setForwardAnchor(null);
          setForwardTicket(null);
        }}
      >
        {departments
          .filter((department) => department !== forwardTicket?.forwardedTo)
          .map((department) => (
            <MenuItem
              key={department}
              onClick={() => handleForward(department)}
            >
              {department}
            </MenuItem>
          ))}
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyTicketsTable;
