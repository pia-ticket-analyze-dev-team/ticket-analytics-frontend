import { Avatar, Box, Typography } from "@mui/material";
import type { AgentPerformance } from "../../types/analytics";

const scoreColor = (score: number) => {
  if (score >= 80) return "#059669";
  if (score >= 50) return "#D97706";
  return "#DC2626";
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface MetricProps {
  label: string;
  value: string;
}

const Metric = ({ label, value }: MetricProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Typography sx={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{label}</Typography>
    <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{value}</Typography>
  </Box>
);

interface AgentPerformanceCardsProps {
  agents: AgentPerformance[];
  emptyMessage?: string;
}

const AgentPerformanceCards = ({
  agents,
  emptyMessage = "No agent activity in the last 30 days.",
}: AgentPerformanceCardsProps) => {
  if (agents.length === 0) {
    return (
      <Typography sx={{ fontSize: 14, color: "#6B7280", textAlign: "center", py: 4 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
      }}
    >
      {agents.map((agent) => (
        <Box
          key={agent.agentId}
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, fontSize: 14, bgcolor: "#2463FF" }}>
              {initials(agent.agentName)}
            </Avatar>

            <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#111827", flex: 1 }}>
              {agent.agentName}
            </Typography>

            <Box
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: scoreColor(agent.performanceScore),
                backgroundColor: `${scoreColor(agent.performanceScore)}1A`,
                borderRadius: "999px",
                px: 1.5,
                py: 0.4,
                whiteSpace: "nowrap",
              }}
            >
              {agent.performanceScore.toFixed(1)} / 100
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              pt: 1.5,
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <Metric
              label="Resolved Tickets (30d)"
              value={agent.resolvedTicketCount.toLocaleString()}
            />
            <Metric
              label="Avg. Satisfaction"
              value={`${agent.averageSatisfactionScore.toFixed(2)} / 5`}
            />
            <Metric label="SLA Success Rate" value={`${agent.slaSuccessRate.toFixed(2)}%`} />
            <Metric
              label="Avg. Resolution Time"
              value={`${agent.averageResolutionHours.toFixed(1)}h`}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AgentPerformanceCards;
