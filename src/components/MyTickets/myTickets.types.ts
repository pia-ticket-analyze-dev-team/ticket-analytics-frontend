export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface MyTicket {
  id: number;
  ticketNo: string;
  customer: string;
  topic: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  sla: string;

  previousAgent: string;
  previousDepartment: string;
  changedAt: string;
}