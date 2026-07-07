import { Box } from "@mui/material";

import CustomerInfoCard from "./CustomerInfoCard";
import CustomerStats from "./CustomerStats";
import type { Customer } from "../customer.types";

type CustomerOverviewProps = {
  customer: Customer;
};

const CustomerOverview = ({ customer }: CustomerOverviewProps) => {
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
        <CustomerStats />
      </Box>
    </Box>
  );
};

export default CustomerOverview;
