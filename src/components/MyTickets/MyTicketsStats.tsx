import { Grid } from "@mui/material";

import StatCard3 from "../Common/StatCard3";
import { useAuth } from "../../auth/AuthContext";
import { useAgentTickets } from "../../hooks/useAgentTickets";

const MyTicketsStats = () => {
  const { user } = useAuth();
  const agentId = user?.agentId ?? null;

  const { data: allData, loading: allLoading } = useAgentTickets({
    agentId,
    page: 0,
    size: 1,
  });

  const { data: openData, loading: openLoading } = useAgentTickets({
    agentId,
    page: 0,
    size: 1,
    status: "OPEN",
  });

  const { data: activeData, loading: activeLoading } = useAgentTickets({
    agentId,
    page: 0,
    size: 1,
    status: "IN_PROGRESS",
  });

  const format = (loading: boolean, total: number | undefined) =>
    loading ? "…" : String(total ?? 0);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Assigned Tickets"
          value={format(allLoading, allData?.totalElements)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Open Tickets"
          value={format(openLoading, openData?.totalElements)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard3
          title="Active Tickets"
          value={format(activeLoading, activeData?.totalElements)}
        />
      </Grid>
    </Grid>
  );
};

export default MyTicketsStats;
