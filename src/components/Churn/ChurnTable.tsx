import {
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { ChurnCustomer } from "../../types/churnType";

type Props = {
  customers: ChurnCustomer[];
  loading: boolean;
  error: string | null;
  search: string;
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "HIGH":
      return "#F57C00";

    case "MEDIUM":
      return "#FBC02D";

    case "LOW":
      return "#2E7D32";

    default:
      return "#9CA3AF";
  }
};

const ChurnTable = ({
  customers,
  loading,
  error,
  search,
}: Props) => {
  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(search.toLowerCase())
  );

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
            <TableCell sx={{ fontWeight: 700 }}>
              Customer
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Segment
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Ticket Count
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Avg. Satisfaction
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Avg. Resolution
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Churn Score
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Risk Level
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
                hover
                key={customer.customerId}
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell>
                  {customer.customerName}
                </TableCell>

                <TableCell>
                  {customer.customerSegment}
                </TableCell>

                <TableCell>
                  {customer.ticketCount}
                </TableCell>

                <TableCell>
                  {customer.averageSatisfactionScore.toFixed(1)} / 5
                </TableCell>

                <TableCell>
                  {customer.averageResolutionHours.toFixed(1)} h
                </TableCell>

                <TableCell>
                  {customer.churnRiskScore.toFixed(1)}
                </TableCell>

                <TableCell>
                  <Chip
                    label={customer.riskLevel}
                    size="small"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      backgroundColor: getRiskColor(
                        customer.riskLevel
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChurnTable;
