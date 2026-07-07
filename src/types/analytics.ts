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
