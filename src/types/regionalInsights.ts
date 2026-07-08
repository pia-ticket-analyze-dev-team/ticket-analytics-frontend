export interface RegionalKpiSummary {
  totalTickets: number;
  activeCities: number;
  successRate: number;
  avgResolutionTimeHours: number;
}

export interface RegionDensity {
  regionName: string;
  ticketCount: number;
  avgResolutionTimeHours: number;
  densityLevel: "HIGH" | "MEDIUM" | "LOW";
}

export interface CityDensity {
  rank: number;
  cityName: string;
  ticketCount: number;
  avgResolutionTimeHours: number;
  densityLevel: "HIGH" | "MEDIUM" | "LOW";
}

export interface RegionalInsights {
  kpis: RegionalKpiSummary;
  regionDensity: RegionDensity[];
  cityDensity: CityDensity[];
}
