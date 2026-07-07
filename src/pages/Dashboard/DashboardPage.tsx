import { Box, Skeleton, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";
import StatTile from "../../components/Dashboard/StatTile";
import ChartCard from "../../components/Dashboard/ChartCard";
import ChartAsyncContent from "../../components/Dashboard/ChartAsyncContent";
import TicketVolumeChart from "../../components/Dashboard/TicketVolumeChart";
import TicketStatusDonut from "../../components/Dashboard/TicketStatusDonut";
import HorizontalBarChart from "../../components/Dashboard/HorizontalBarChart";
import SlaBreachGauge from "../../components/Dashboard/SlaBreachGauge";
import VerticalBarChart from "../../components/Dashboard/VerticalBarChart";
import type { StatTileData } from "../../types/dashboard";
import { useKpiSummary } from "../../hooks/useKpiSummary";
import { useTicketVolume } from "../../hooks/useTicketVolume";
import { useTicketsByStatus } from "../../hooks/useTicketsByStatus";
import { useServiceTypeTrend } from "../../hooks/useServiceTypeTrend";
import { useTopIssueTopics } from "../../hooks/useTopIssueTopics";
import { useDepartmentWorkload } from "../../hooks/useDepartmentWorkload";
import { useSlaTargetRate } from "../../hooks/useSlaTargetRate";
import {
  buildKpiStatTiles,
  buildLabeledCounts,
  buildServiceTypeCounts,
  buildSlaBreachTile,
  buildTicketStatusBreakdown,
  buildTicketVolumeSeries,
  computeSlaBreachRate,
} from "../../utils/dashboardStats";

const unavailableTile = (label: string): StatTileData => ({
  label,
  value: "—",
  delta: "",
  deltaGood: true,
  comparisonLabel: "Unavailable",
});

const DashboardPage = () => {
  const { data, loading, error } = useKpiSummary();
  const kpiTiles = data ? buildKpiStatTiles(data) : null;

  const volume = useTicketVolume();
  const status = useTicketsByStatus();
  const serviceType = useServiceTypeTrend();
  const topics = useTopIssueTopics();
  const departments = useDepartmentWorkload();
  const sla = useSlaTargetRate();
  const slaTile = sla.data ? buildSlaBreachTile(sla.data) : null;

  const tilePositions: (StatTileData | "loading")[] = [
    kpiTiles?.[0] ?? (loading ? "loading" : unavailableTile("Total Customers")),
    kpiTiles?.[1] ?? (loading ? "loading" : unavailableTile("Total Tickets")),
    kpiTiles?.[2] ?? (loading ? "loading" : unavailableTile("Open Tickets")),
    kpiTiles?.[3] ?? (loading ? "loading" : unavailableTile("Avg. Resolution Time")),
    kpiTiles?.[4] ?? (loading ? "loading" : unavailableTile("Customer Satisfaction")),
  ];

  return (
    <MainLayout>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#9CA3AF", mt: 0.5 }}>Dashboard</Typography>
      </Box>

      {error && (
        <Typography sx={{ fontSize: 13, color: "#d03b3b", mb: 1.5 }}>{error}</Typography>
      )}

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
        {tilePositions.map((tile, i) =>
          tile === "loading" ? (
            <Skeleton key={i} variant="rounded" height={112} sx={{ borderRadius: "12px" }} />
          ) : (
            <StatTile key={tile.label} tile={tile} />
          )
        )}
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
          <ChartAsyncContent
            loading={volume.loading}
            error={volume.error}
            data={volume.data}
            skeletonHeight={230}
          >
            {(points) => <TicketVolumeChart data={buildTicketVolumeSeries(points)} />}
          </ChartAsyncContent>
        </ChartCard>

        <ChartCard title="Tickets by Status">
          <ChartAsyncContent
            loading={status.loading}
            error={status.error}
            data={status.data}
            skeletonHeight={220}
          >
            {(statuses) => <TicketStatusDonut data={buildTicketStatusBreakdown(statuses)} />}
          </ChartAsyncContent>
        </ChartCard>

        <ChartCard title="Tickets by Service Type">
          <ChartAsyncContent
            loading={serviceType.loading}
            error={serviceType.error}
            data={serviceType.data}
            skeletonHeight={200}
          >
            {(items) => (
              <HorizontalBarChart
                data={buildServiceTypeCounts(items)}
                showAxis
                labelWidth={100}
              />
            )}
          </ChartAsyncContent>
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
          <ChartAsyncContent
            loading={sla.loading}
            error={sla.error}
            data={sla.data}
            skeletonHeight={150}
          >
            {(data) => <SlaBreachGauge value={computeSlaBreachRate(data)} />}
          </ChartAsyncContent>
        </ChartCard>

        <ChartCard title="Top 5 Issue Topics">
          <ChartAsyncContent
            loading={topics.loading}
            error={topics.error}
            data={topics.data}
            skeletonHeight={200}
          >
            {(items) => <HorizontalBarChart data={buildLabeledCounts(items)} labelWidth={150} />}
          </ChartAsyncContent>
        </ChartCard>

        <ChartCard title="Department Workload">
          <ChartAsyncContent
            loading={departments.loading}
            error={departments.error}
            data={departments.data}
            skeletonHeight={220}
          >
            {(items) => <VerticalBarChart data={buildLabeledCounts(items)} />}
          </ChartAsyncContent>
        </ChartCard>
      </Box>
    </MainLayout>
  );
};

export default DashboardPage;
