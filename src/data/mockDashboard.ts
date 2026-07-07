export interface StatTileData {
  label: string;
  value: string;
  delta: string;
  deltaGood: boolean;
  comparisonLabel: string;
}

export interface TicketVolumePoint {
  label: string;
  value: number;
}

export interface TicketStatusSlice {
  label: string;
  value: number;
  color: string;
}
