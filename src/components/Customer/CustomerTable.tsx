import { useState } from "react";
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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate } from "react-router-dom";

import type { Customer } from "./customer.types";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

type CustomerTableProps = {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  city: string;
  onEdit: (customer: Customer) => void;
  onDeleted: () => void;
};

const getCityFromAddress = (address: string) =>
  address.trim().split(/\s+/).pop()?.replace(/[,.]+$/, "") ?? "";

const CustomerTable = ({
  customers,
  loading,
  error,
  city,
  onEdit,
  onDeleted,
}: CustomerTableProps) => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesCity = city === "All" || getCityFromAddress(customer.address) === city;

    return matchesCity;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: "20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Segment</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
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

          {!loading && !error && filteredCustomers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 4 }}
              >
                <Typography color="text.secondary">No customers found.</Typography>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                hover
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell>
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.segment}</TableCell>
                <TableCell>{getCityFromAddress(customer.address)}</TableCell>
                <TableCell>{customer.createdAt}</TableCell>

                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => onEdit(customer)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(customer)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DeleteCustomerDialog
        open={deleteTarget !== null}
        customer={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={onDeleted}
      />
    </TableContainer>
  );
};

export default CustomerTable;
