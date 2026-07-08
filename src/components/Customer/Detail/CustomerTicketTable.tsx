import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";

import CustomerEditableStatus from "./CustomerEditableStatus";
import CustomerEditablePriority from "./CustomerEditablePriority";
import CustomerEditableActions from "./CustomerEditableActions";

import type {
  CustomerTicket,
  CustomerTicketPriority,
  CustomerTicketStatus,
} from "./customerTicket.types";

interface CustomerTicketTableProps {
  tickets: CustomerTicket[];
}

const CustomerTicketTable = ({
  tickets,
}: CustomerTicketTableProps) => {
  const [tableData, setTableData] =
    useState<CustomerTicket[]>(tickets);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editedStatus, setEditedStatus] =
    useState<CustomerTicketStatus>("OPEN");

  const [editedPriority, setEditedPriority] =
    useState<CustomerTicketPriority>("LOW");

  const handleEdit = (ticket: CustomerTicket) => {
    setEditingId(ticket.id);
    setEditedStatus(ticket.status);
    setEditedPriority(ticket.priority);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (id: string) => {
    setTableData((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status: editedStatus,
              priority: editedPriority,
            }
          : ticket
      )
    );

    setEditingId(null);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,.06)",
      }}
    >
      <Typography
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Customer Tickets
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ background: "#F8FAFC" }}>
            <TableCell sx={{ fontWeight: 700 }}>
              Ticket No
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Issue
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Status
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Priority
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Department
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Created At
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                width: 90,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.map((ticket) => {
            const editing =
              editingId === ticket.id;

            return (
              <TableRow
                key={ticket.id}
                hover
              >
                <TableCell>
                  {ticket.id}
                </TableCell>

                <TableCell>
                  {ticket.issue}
                </TableCell>

                <TableCell sx={{ width: 180 }}>
                  <CustomerEditableStatus
                    value={ticket.status}
                    editing={editing}
                    onChange={setEditedStatus}
                  />
                </TableCell>

                <TableCell sx={{ width: 180 }}>
                  <CustomerEditablePriority
                    value={ticket.priority}
                    editing={editing}
                    onChange={setEditedPriority}
                  />
                </TableCell>

                <TableCell>
                  {ticket.department}
                </TableCell>

                <TableCell>
                  {ticket.createdAt}
                </TableCell>

                <TableCell>
                  <CustomerEditableActions
                    editing={editing}
                    onEdit={() =>
                      handleEdit(ticket)
                    }
                    onSave={() =>
                      handleSave(ticket.id)
                    }
                    onCancel={handleCancel}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTicketTable;