import StatCard from "../../Common/StatCard";

type CustomerStatsProps = {
  totalTickets: number;
  openTickets: number;
  slaBreachRate: number;
  averageSatisfactionScore: number;
};

const CustomerStats = ({
  totalTickets,
  openTickets,
  slaBreachRate,
  averageSatisfactionScore,
}: CustomerStatsProps) => {
  return (
    <>
      <StatCard
        title="Total Tickets"
        value={totalTickets}
      />

      <StatCard
        title="Open Tickets"
        value={openTickets}
        color="#F59E0B"
      />

      <StatCard
        title="SLA Breach Rate"
        value={`${slaBreachRate.toFixed(1)}%`}
        color="#EF4444"
      />

      <StatCard
        title="Avg. Satisfaction"
        value={`${averageSatisfactionScore.toFixed(1)} / 5`}
        color="#10B981"
      />
    </>
  );
};

export default CustomerStats;
