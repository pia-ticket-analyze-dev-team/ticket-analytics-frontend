import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

import type { CustomerTicket } from "../customer.types";

interface CustomerTicketTableProps {
  tickets: CustomerTicket[];
}

const formatDateTime = (value: string) => {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
};

const statusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "warning";
    case "IN_PROGRESS":
      return "info";
    case "RESOLVED":
      return "success";
    case "CLOSED":
      return "default";
    default:
      return "default";
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "error";
    case "MEDIUM":
      return "warning";
    case "LOW":
      return "success";
    default:
      return "default";
  }
};

const CustomerTicketTable = ({
  tickets,
}: CustomerTicketTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        sx={{
          px: 3,
          pt: 2.5,
          pb: 2,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        Customer Tickets
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ background: "#F8FAFC" }}>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Ticket No
            </TableCell>

            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Issue
            </TableCell>

            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Status
            </TableCell>

            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Priority
            </TableCell>

            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Department
            </TableCell>

            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Created At
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ py: 6 }}
              >
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  No tickets found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                hover
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell sx={{ py: 1, fontWeight: 500 }}>
                  {ticket.ticketNumber}
                </TableCell>

                <TableCell sx={{ py: 1 }}>
                  {ticket.issueTopicName ?? "—"}
                </TableCell>

                <TableCell sx={{ py: 1 }}>
                  <Chip
                    label={ticket.status}
                    color={statusColor(ticket.status)}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>

                <TableCell sx={{ py: 1 }}>
                  <Chip
                    label={ticket.priority}
                    color={priorityColor(ticket.priority)}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>

                <TableCell sx={{ py: 1 }}>
                  {ticket.departmentName ?? "—"}
                </TableCell>

                <TableCell sx={{ py: 1 }}>
                  {formatDateTime(ticket.createdAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTicketTable;
