import Grid from "@mui/material/Grid";
import StatCard2 from "../Common/StatCard2";

const RegionalStats = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Total Tickets"
          value="12,548"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Active Cities"
          value="81"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Success Rate"
          value="94.2%"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Avg Resolution"
          value="2.8 h"
        />
      </Grid>
    </Grid>
  );
};

export default RegionalStats;