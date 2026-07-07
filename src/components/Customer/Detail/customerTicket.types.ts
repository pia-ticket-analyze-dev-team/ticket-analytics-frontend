export type CustomerTicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export type CustomerTicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface CustomerTicket {
  id: string;
  issue: string;
  status: CustomerTicketStatus;
  priority: CustomerTicketPriority;
  department: string;
  createdAt: string;
}