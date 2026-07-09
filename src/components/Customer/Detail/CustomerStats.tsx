import StatCard from "../../Common/StatCard";

import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

import type { CustomerTicketStats } from "../customer.types";

type CustomerStatsProps = {
  stats: CustomerTicketStats;
};

const CustomerStats = ({ stats }: CustomerStatsProps) => {
  return (
    <>
      <StatCard
        title="Total Tickets"
        value={stats.totalTickets}
        icon={
          <ConfirmationNumberOutlinedIcon
            sx={{
              fontSize: 30,
              color: "#2563EB",
            }}
          />
        }
      />

      <StatCard
        title="Open Tickets"
        value={stats.openTickets}
        color="#F59E0B"
        icon={
          <FolderOpenOutlinedIcon
            sx={{
              fontSize: 30,
              color: "#F59E0B",
            }}
          />
        }
      />

      <StatCard
        title="SLA Breaches"
        value={stats.slaBreachCount}
        color="#EF4444"
        icon={
          <WarningAmberOutlinedIcon
            sx={{
              fontSize: 30,
              color: "#EF4444",
            }}
          />
        }
      />

      <StatCard
        title="Avg. Satisfaction"
        value={`${stats.averageSatisfactionScore.toFixed(1)}`}
        color="#10B981"
        icon={
          <SentimentSatisfiedAltOutlinedIcon
            sx={{
              fontSize: 30,
              color: "#10B981",
            }}
          />
        }
      />
    </>
  );
};

export default CustomerStats;
