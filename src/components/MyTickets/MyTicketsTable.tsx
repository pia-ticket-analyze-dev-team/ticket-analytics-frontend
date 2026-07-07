import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import type {
  MyTicket,
  TicketPriority,
  TicketStatus,
} from "./myTickets.types";
import { myTickets } from "../../data/mockMyTickets";
import EditablePriority from "./EditablePriority";
import EditableStatus from "./EditableStatus";
import EditableActions from "./EditableActions";
import DeleteTicketDialog from "./DeleteTicketDialog";
import AssignmentHistoryDialog from "./AssignmentHistoryDialog";

type Props = {
  search: string;
  status: string;
  priority: string;
};

const MyTicketsTable = ({ search, status, priority }: Props) => {
  const [tickets, setTickets] = useState<MyTicket[]>(myTickets);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTicket, setEditedTicket] = useState<MyTicket | null>(null);
  const [deleteTicket, setDeleteTicket] = useState<MyTicket | null>(null);
  const [historyTicket, setHistoryTicket] = useState<MyTicket | null>(null);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticketNo.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || ticket.status === status;

    const matchesPriority = priority === "All" || ticket.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
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

  const handleDelete = () => {
    if (!deleteTicket) return;

    setTickets((prev) =>
      prev.filter((ticket) => ticket.id !== deleteTicket.id)
    );

    setDeleteTicket(null);
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
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  width: 120,
                  minWidth: 120,
                }}
              >
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
                  <TableCell
                    align="center"
                    sx={{
                      width: 120,
                      minWidth: 120,
                    }}
                  >
                    <EditableActions
                      editing={isEditing}
                      onView={() => setHistoryTicket(ticket)}
                      onEdit={() => handleEdit(ticket)}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      onDelete={() => setDeleteTicket(ticket)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
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

      <DeleteTicketDialog
        open={Boolean(deleteTicket)}
        ticketNo={deleteTicket?.ticketNo ?? ""}
        onClose={() => setDeleteTicket(null)}
        onDelete={handleDelete}
      />

      <AssignmentHistoryDialog
        open={Boolean(historyTicket)}
        ticket={historyTicket}
        onClose={() => setHistoryTicket(null)}
      />
    </>
  );
};

export default MyTicketsTable;