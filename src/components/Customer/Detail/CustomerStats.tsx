import StatCard from "../../Common/StatCard";

const CustomerStats = () => {
  return (
    <>
      <StatCard
        title="Total Tickets"
        value={5}
      />

      <StatCard
        title="Open Tickets"
        value={2}
        color="#F59E0B"
      />

      <StatCard
        title="SLA Breaches"
        value={0}
        color="#EF4444"
      />

      <StatCard
        title="Avg. Satisfaction"
        value="4.6 / 5"
        color="#10B981"
      />
    </>
  );
};

export default CustomerStats;