import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useNavigate } from "react-router-dom";

import type { Customer } from "./customer.types";

type CustomerTableProps = {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  onEdit: (customer: Customer) => void;
};

const getCityFromAddress = (address: string) =>
  address.trim().split(/\s+/).pop()?.replace(/[,.]+$/, "") ?? "";

const CustomerTable = ({
  customers,
  loading,
  error,
  onEdit,
}: CustomerTableProps) => {
  const navigate = useNavigate();

  const filteredCustomers = customers;

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Customer Name
            </TableCell>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Phone
            </TableCell>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Segment
            </TableCell>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              City
            </TableCell>
            <TableCell sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Created At
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, py: 1.5, color: "text.secondary" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <CircularProgress size={28} />
              </TableCell>
            </TableRow>
          )}

          {!loading && error && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && filteredCustomers.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary" variant="body2">
                  No customers found.
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && filteredCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell sx={{ py: 1.25, fontWeight: 500 }}>
                {customer.firstName} {customer.lastName}
              </TableCell>
              <TableCell sx={{ py: 1.25 }}>
                {customer.email}
              </TableCell>
              <TableCell sx={{ py: 1.25 }}>
                {customer.phone}
              </TableCell>
              <TableCell sx={{ py: 1.25 }}>
                {customer.segment}
              </TableCell>
              <TableCell sx={{ py: 1.25 }}>
                {getCityFromAddress(customer.address)}
              </TableCell>
              <TableCell sx={{ py: 1.25 }}>
                {customer.createdAt}
              </TableCell>
              <TableCell align="center" sx={{ py: 1, px: 0 }}>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/customers/${customer.id}`)}
                  sx={{ mx: 0.5 }}
                >
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onEdit(customer)}
                  sx={{ mx: 0.5 }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
