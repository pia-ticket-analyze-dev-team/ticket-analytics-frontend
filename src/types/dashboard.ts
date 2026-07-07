export interface KpiMetric {
  currentValue: number;
  previousValue: number;
  changeAbsolute: number;
  changePercentage: number;
}

export interface KpiSummary {
  totalCustomers: KpiMetric;
  totalTickets: KpiMetric;
  openTickets: KpiMetric;
  avgResolutionTimeHours: KpiMetric;
  avgCustomerSatisfaction: KpiMetric;
}

export interface DailyTicketVolume {
  date: string;
  ticketCount: number;
}

export type TicketStatusKey = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface StatusCount {
  status: TicketStatusKey;
  ticketCount: number;
  pctOfTotal: number;
}

export interface NamedCount {
  name: string;
  ticketCount: number;
}
