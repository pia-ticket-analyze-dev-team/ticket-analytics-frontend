export type CustomerSegment = "Individual" | "Corporate";

export type RiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface ChurnCustomer {
  id: number;

  customerName: string;

  segment: CustomerSegment;

  ticketCount: number;

  satisfactionScore: number; // 0-5

  averageResolutionHours: number;

  churnRiskScore: number; // 0-100

  riskLevel: RiskLevel;
}