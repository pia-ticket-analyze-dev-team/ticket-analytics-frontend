import { Grid } from "@mui/material";

import StatCard3 from "../Common/StatCard3";

const MyTicketsStats = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Assigned Tickets"
          value="28"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Open Tickets"
          value="9"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Active Tickets"
          value="12"
        />
      </Grid>
    </Grid>
  );
};

export default MyTicketsStats;