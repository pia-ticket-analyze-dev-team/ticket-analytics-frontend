import { Box } from "@mui/material";

import CustomerInfoCard from "./CustomerInfoCard";
import CustomerStats from "./CustomerStats";

const CustomerOverview = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: 3,
        mb: 4,
        alignItems: "stretch",
      }}
    >
      <CustomerInfoCard />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gridAutoRows: "160px",
          gap: 2,
        }}
      >
        <CustomerStats />
      </Box>
    </Box>
  );
};

export default CustomerOverview;