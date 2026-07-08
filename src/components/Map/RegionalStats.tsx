import Grid from "@mui/material/Grid";
import StatCard2 from "../Common/StatCard2";
import type { RegionalKpiSummary } from "../../types/regionalInsights";

type RegionalStatsProps = {
  kpis: RegionalKpiSummary;
};

const RegionalStats = ({ kpis }: RegionalStatsProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Total Tickets"
          value={kpis.totalTickets.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Active Cities"
          value={String(kpis.activeCities)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Success Rate"
          value={`${kpis.successRate.toFixed(1)}%`}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard2
          title="Avg Resolution"
          value={`${kpis.avgResolutionTimeHours.toFixed(1)} h`}
        />
      </Grid>
    </Grid>
  );
};

export default RegionalStats;
