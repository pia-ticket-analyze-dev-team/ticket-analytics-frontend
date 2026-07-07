import type { StatTileData, TicketStatusSlice, TicketVolumePoint } from "../data/mockDashboard";
import type {
  DailyTicketVolume,
  KpiSummary,
  NamedCount,
  StatusCount,
  TicketStatusKey,
} from "../types/dashboard";

const formatSignedPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const formatSignedHours = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}h`;

const formatSignedScore = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

export const buildKpiStatTiles = (kpi: KpiSummary): StatTileData[] => [
  {
    label: "Total Customers",
    value: Math.round(kpi.totalCustomers.currentValue).toLocaleString(),
    delta: formatSignedPercent(kpi.totalCustomers.changePercentage),
    deltaGood: kpi.totalCustomers.changePercentage >= 0,
    comparisonLabel: "vs last month",
  },
  {
    label: "Total Tickets",
    value: Math.round(kpi.totalTickets.currentValue).toLocaleString(),
    delta: formatSignedPercent(kpi.totalTickets.changePercentage),
    deltaGood: kpi.totalTickets.changePercentage >= 0,
    comparisonLabel: "vs last month",
  },
  {
    label: "Open Tickets",
    value: Math.round(kpi.openTickets.currentValue).toLocaleString(),
    delta: formatSignedPercent(kpi.openTickets.changePercentage),
    deltaGood: kpi.openTickets.changePercentage <= 0,
    comparisonLabel: "vs last month",
  },
  {
    label: "Avg. Resolution Time",
    value: `${kpi.avgResolutionTimeHours.currentValue.toFixed(1)}h`,
    delta: formatSignedHours(kpi.avgResolutionTimeHours.changeAbsolute),
    deltaGood: kpi.avgResolutionTimeHours.changeAbsolute <= 0,
    comparisonLabel: "vs last month",
  },
  {
    label: "Customer Satisfaction",
    value: `${kpi.avgCustomerSatisfaction.currentValue.toFixed(2)} / 5`,
    delta: formatSignedScore(kpi.avgCustomerSatisfaction.changeAbsolute),
    deltaGood: kpi.avgCustomerSatisfaction.changeAbsolute >= 0,
    comparisonLabel: "vs last month",
  },
];

const formatShortDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

export const buildTicketVolumeSeries = (points: DailyTicketVolume[]): TicketVolumePoint[] =>
  points.map((point) => ({
    label: formatShortDate(point.date),
    value: point.ticketCount,
  }));

// Fixed categorical order + colors, independent of the order the API returns
// statuses in — never cycle hue assignment based on response order.
const STATUS_META: Record<TicketStatusKey, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "#eb6834" },
  IN_PROGRESS: { label: "In Progress", color: "#2a78d6" },
  RESOLVED: { label: "Resolved", color: "#008300" },
  CLOSED: { label: "Closed", color: "#4B5563" },
};

const STATUS_ORDER: TicketStatusKey[] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export const buildTicketStatusBreakdown = (statuses: StatusCount[]): TicketStatusSlice[] => {
  const countByStatus = new Map(statuses.map((s) => [s.status, s.ticketCount]));

  return STATUS_ORDER.filter((key) => countByStatus.has(key)).map((key) => ({
    label: STATUS_META[key].label,
    color: STATUS_META[key].color,
    value: countByStatus.get(key) ?? 0,
  }));
};

export const buildLabeledCounts = (items: NamedCount[]) =>
  items.map((item) => ({ label: item.name, value: item.ticketCount }));
