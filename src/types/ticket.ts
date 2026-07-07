export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "HIGH" | "MEDIUM" | "LOW";

export interface Ticket {
  ticketNo: string;
  customer: string;
  description: string;
  issueTopic: string;
  department: string;
  city: string;
  priority: TicketPriority;
  status: TicketStatus;
  slaBreached: boolean;
  createdAt: Date;
  assignedAgent: string | null;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TicketUpdate {
  issueTopic: string;
  department: string;
  city: string;
  priority: TicketPriority;
  status: TicketStatus;
}

export interface TicketFilterState {
  status: string;
  priority: string;
  issueTopic: string;
  department: string;
  city: string;
  slaBreached: string;
  assignedAgent: string;
}

export const defaultTicketFilters: TicketFilterState = {
  status: "All",
  priority: "All",
  issueTopic: "All",
  department: "All",
  city: "All",
  slaBreached: "All",
  assignedAgent: "All",
};
