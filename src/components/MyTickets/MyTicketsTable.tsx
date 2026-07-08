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
} from "@mui/material";

import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

import type {
  MyTicket,
  TicketPriority,
  TicketStatus,
} from "./myTickets.types";

import { myTickets } from "../../data/mockMyTickets";
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

const MyTicketsTable = ({ search, status, priority }: Props) => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState<MyTicket[]>(myTickets);
  const [editingId, setEditingId] = useState<number | null>(null);
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

    const matchesStatus = status === "All" || ticket.status === status;
    const matchesPriority = priority === "All" || ticket.priority === priority;

    // Admin ise tüm ticketları görebilsin.
    if (user?.role === "ADMIN") {
      return matchesSearch && matchesStatus && matchesPriority;
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      ticket.assignedAgent === user?.name
    );
  });

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

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === editedTicket.id ? editedTicket : ticket
      )
    );

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

    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== forwardTicket.id) {
          return ticket;
        }

        return {
          ...ticket,
          forwardedTo: department,
          assignedAgent: randomAgent,
          assignmentHistory: [
            ...ticket.assignmentHistory,
            {
              department,
              agent: randomAgent,
              changedAt: new Date().toLocaleString(),
            },
          ],
        };
      })
    );

    setSnackbarMessage(
      `Ticket successfully forwarded to ${department} and assigned to ${randomAgent}.`
    );

    setSnackbarOpen(true);
    setForwardAnchor(null);
    setForwardTicket(null);
  };

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
            {filteredTickets.map((ticket) => {
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

            {filteredTickets.length === 0 && (
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