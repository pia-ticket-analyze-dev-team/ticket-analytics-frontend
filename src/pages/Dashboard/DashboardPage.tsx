import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";
import StatTile from "../../components/Dashboard/StatTile";
import ChartCard from "../../components/Dashboard/ChartCard";
import TicketVolumeChart from "../../components/Dashboard/TicketVolumeChart";
import TicketStatusDonut from "../../components/Dashboard/TicketStatusDonut";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import SlaBreachGauge from "../../components/Dashboard/SlaBreachGauge";
import VerticalBarChart from "../../components/Dashboard/VerticalBarChart";
import {
  statTiles,
  ticketsByRegion,
  topIssueTopics,
  departmentWorkload,
} from "../../data/mockDashboard";

const DashboardPage = () => {
  return (
    <MainLayout>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#9CA3AF", mt: 0.5 }}>Dashboard</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(6, 1fr)",
          },
          gap: 2.5,
          mb: 2.5,
        }}
      >
        {statTiles.map((tile) => (
          <StatTile key={tile.label} tile={tile} />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.3fr 1fr 1fr" },
          gap: 2.5,
          mb: 2.5,
        }}
      >
        <ChartCard
          title="Ticket Volume Over Time"
          rangeOptions={["Last 30 Days", "Last 7 Days", "Last 90 Days"]}
        >
          <TicketVolumeChart />
        </ChartCard>

        <ChartCard title="Tickets by Status">
          <TicketStatusDonut />
        </ChartCard>

        <ChartCard
          title="Tickets by Region"
          rangeOptions={["Last 30 Days", "Last 7 Days", "Last 90 Days"]}
        >
          <HorizontalBarChart data={ticketsByRegion} showAxis labelWidth={70} />
        </ChartCard>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.1fr 1.1fr" },
          gap: 2.5,
        }}
      >
        <ChartCard title="SLA Breach Rate">
          <SlaBreachGauge />
        </ChartCard>

        <ChartCard title="Top 5 Issue Topics">
          <HorizontalBarChart data={topIssueTopics} labelWidth={150} />
        </ChartCard>

        <ChartCard title="Department Workload">
          <VerticalBarChart data={departmentWorkload} />
        </ChartCard>
      </Box>
    </MainLayout>
  );
};

export default DashboardPage;
