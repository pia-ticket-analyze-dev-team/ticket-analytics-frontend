import { Box } from "@mui/material";

import CustomerInfoCard from "./CustomerInfoCard";
import CustomerStats from "./CustomerStats";

const CustomerOverview = () => {
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
      <CustomerInfoCard />

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