import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { mockChurn } from "../../data/mockChurn";

type Props = {
  search: string;
  segment: string;
  riskLevel: string;
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Critical":
      return "#D32F2F";

    case "High":
      return "#F57C00";

    case "Medium":
      return "#FBC02D";

    case "Low":
      return "#2E7D32";

    default:
      return "#9CA3AF";
  }
};

const ChurnTable = ({
  search,
  segment,
  riskLevel,
}: Props) => {
  const filteredCustomers = mockChurn.filter((customer) => {
    const matchesSearch = customer.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSegment =
      segment === "All" || customer.segment === segment;

    const matchesRisk =
      riskLevel === "All" ||
      customer.riskLevel === riskLevel;

    return (
      matchesSearch &&
      matchesSegment &&
      matchesRisk
    );
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
          {filteredCustomers.map((customer) => (
            <TableRow
              hover
              key={customer.id}
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
                {customer.segment}
              </TableCell>

              <TableCell>
                {customer.ticketCount}
              </TableCell>

              <TableCell>
                {customer.satisfactionScore.toFixed(1)} / 5
              </TableCell>

              <TableCell>
                {customer.averageResolutionHours} h
              </TableCell>

              <TableCell>
                {customer.churnRiskScore}
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