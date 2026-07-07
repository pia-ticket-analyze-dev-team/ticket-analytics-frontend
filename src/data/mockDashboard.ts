export interface StatTileData {
  label: string;
  value: string;
  delta: string;
  deltaGood: boolean;
  comparisonLabel: string;
}

// SLA Breach Rate has no backend data source yet, so it stays static
// while the other five KPI tiles are fetched live (see dashboardApi.ts).
export const slaStatTile: StatTileData = {
  label: "SLA Breach Rate",
  value: "2.35%",
  delta: "+0.6%",
  deltaGood: false,
  comparisonLabel: "vs last month",
};

export interface TicketVolumePoint {
  label: string;
  value: number;
}

export interface TicketStatusSlice {
  label: string;
  value: number;
  color: string;
}

export const slaBreachRate = {
  value: 2.35,
  max: 10,
  delta: "+0.6%",
  comparisonLabel: "vs last month",
};
