import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate } from "react-router-dom";

import type { CustomerTicket } from "../customer.types";

interface CustomerTicketTableProps {
  tickets: CustomerTicket[];
  loading: boolean;
  error: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return {
        bgcolor: "#FFF7ED",
        color: "#EA580C",
      };

    case "RESOLVED":
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };

    case "IN_PROGRESS":
      return {
        bgcolor: "#EFF6FF",
        color: "#2563EB",
      };

    default:
      return {
        bgcolor: "#F3F4F6",
        color: "#4B5563",
      };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return {
        bgcolor: "#FEF2F2",
        color: "#DC2626",
      };

    case "MEDIUM":
      return {
        bgcolor: "#FFF7ED",
        color: "#D97706",
      };

    case "LOW":
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };

    case "CRITICAL":
      return {
        bgcolor: "#FEF2F2",
        color: "#DC2626",
      };
  }
};

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

const CustomerTicketTable = ({ tickets, loading, error }: CustomerTicketTableProps) => {
  const navigate = useNavigate();

  const handleDelete = (ticketId: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${ticketId}?`
    );

    if (confirmed) {
      console.log("Deleted:", ticketId);

      // Backend geldiğinde burada API çağrısı olacak.
    }
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
            <TableCell sx={{ fontWeight: 700 }}>Ticket No</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 4 }}
              >
                <CircularProgress size={28} />
              </TableCell>
            </TableRow>
          )}

          {!loading && error && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 4 }}
              >
                <Typography color="error">{error}</Typography>
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && tickets.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 4 }}
              >
                <Typography color="text.secondary">No tickets found.</Typography>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                hover
              >
                <TableCell>{ticket.ticketNumber}</TableCell>

                <TableCell>{ticket.issueTopicName ?? "—"}</TableCell>

                <TableCell>
                  <Chip
                    label={ticket.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      ...getStatusColor(ticket.status),
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={ticket.priority}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      ...getPriorityColor(ticket.priority),
                    }}
                  />
                </TableCell>

                <TableCell>{ticket.departmentName ?? "—"}</TableCell>

                <TableCell>{formatDateTime(ticket.createdAt)}</TableCell>

                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() =>
                      navigate(`/tickets/${ticket.id}/edit`)
                    }
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTicketTable;
