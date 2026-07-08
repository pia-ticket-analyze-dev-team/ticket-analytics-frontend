export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface ChurnCustomer {
  customerId: string;
  customerName: string;
  customerSegment: string;
  ticketCount: number;
  averageSatisfactionScore: number;
  slaBreachRate: number;
  averageResolutionHours: number;
  churnRiskScore: number;
  riskLevel: RiskLevel;
}

export interface ChurnPageResponse {
  content: ChurnCustomer[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
