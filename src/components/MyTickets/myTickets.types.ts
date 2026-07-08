export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface AssignmentStep {
  department: string;
  agent: string;
  changedAt: string;
}

export interface MyTicket {
  id: number;
  ticketNo: string;
  customer: string;
 topic: string;

  priority: TicketPriority;
  status: TicketStatus;

  createdAt: string;
  sla: string;

  // Ticket şu an hangi departmanda?
  forwardedTo: string;

  // Ticket şu an hangi agentta?
  assignedAgent: string;

  assignmentHistory: AssignmentStep[];
}