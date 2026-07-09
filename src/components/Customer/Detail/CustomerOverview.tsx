import { Box } from "@mui/material";

import CustomerInfoCard from "./CustomerInfoCard";
import CustomerStats from "./CustomerStats";

import type {
  Customer,
  CustomerTicketStats,
} from "../customer.types";

type CustomerOverviewProps = {
  customer: Customer;
  stats: CustomerTicketStats;
};

const CustomerOverview = ({
  customer,
  stats,
}: CustomerOverviewProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "3fr 1fr",
        },
        gap: 3,
        mb: 4,
        alignItems: "start",
      }}
    >
      <CustomerInfoCard customer={customer} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 2,
          alignSelf: "start",
        }}
      >
        <CustomerStats stats={stats} />
      </Box>
    </Box>
  );
};

export default CustomerOverview;
