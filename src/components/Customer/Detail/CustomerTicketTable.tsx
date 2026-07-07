import {
  Chip,
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

interface Ticket {
  id: string;
  issue: string;
  status: string;
  priority: string;
  department: string;
  createdAt: string;
}

interface CustomerTicketTableProps {
  tickets: Ticket[];
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
  switch (priority) {
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

    default:
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };
  }
};

const CustomerTicketTable = ({
  tickets,
}: CustomerTicketTableProps) => {
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
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              hover
            >
              <TableCell>{ticket.id}</TableCell>

              <TableCell>{ticket.issue}</TableCell>

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

              <TableCell>{ticket.department}</TableCell>

              <TableCell>{ticket.createdAt}</TableCell>

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