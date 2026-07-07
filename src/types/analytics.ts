export interface SlaTargetRate {
  totalTicketCount: number;
  breachedTicketCount: number;
  withinSlaTicketCount: number;
  slaTargetRate: number;
}

export interface ServiceTypeTrend {
  serviceTypeId: string;
  serviceTypeName: string;
  month: string;
  ticketCount: number;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  resolvedTicketCount: number;
  averageSatisfactionScore: number;
  slaSuccessRate: number;
  averageResolutionHours: number;
  performanceScore: number;
}

// Spring Data's Page<T> serializes with several pagination/metadata fields
// beyond `content` (totalElements, sort, etc.) — only `content` is needed here.
export interface PageResponse<T> {
  content: T[];
}
