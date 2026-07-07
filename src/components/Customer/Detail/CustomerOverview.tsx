import { Box } from "@mui/material";

import CustomerInfoCard from "./CustomerInfoCard";
import CustomerStats from "./CustomerStats";
import type { Customer, CustomerTicketStats } from "../customer.types";

type CustomerOverviewProps = {
  customer: Customer;
  stats: CustomerTicketStats;
};

const CustomerOverview = ({ customer, stats }: CustomerOverviewProps) => {
  const slaBreachRate = stats.totalTickets > 0 ? (stats.slaBreachCount / stats.totalTickets) * 100 : 0;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "520px 1fr",
        gap: 3,
        alignItems: "stretch",
        mb: 4,
      }}
    >
      <CustomerInfoCard customer={customer} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(160px, 1fr))",
          gap: 3,
        }}
      >
        <CustomerStats
          totalTickets={stats.totalTickets}
          openTickets={stats.openTickets}
          slaBreachRate={slaBreachRate}
          averageSatisfactionScore={stats.averageSatisfactionScore}
        />
      </Box>
    </Box>
  );
};

export default CustomerOverview;
