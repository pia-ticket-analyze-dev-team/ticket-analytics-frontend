export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "High" | "Medium" | "Low" | "Critical";

export interface Ticket {
  id: string;
  ticketNumber: string;
  customerId: string | null;
  customerName: string | null;
  topicId: string | null;
  issueTopicName: string | null;
  currentDepartmentId: string | null;
  departmentName: string | null;
  regionId: string | null;
  city: string | null;
  agentId: string | null;
  assignedAgentName: string | null;
  serviceTypeId: string | null;
  serviceTypeName: string | null;
  infrastructureTypeId: string | null;
  infrastructureTypeName: string | null;
  description: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  slaBreached: boolean;
  resolutionTimeHours: number | null;
  customerSatisfactionScore: number | null;
  createdAt: string;
  resolvedAt: string | null;
  creationSource: string | null;
  slaTargetHours: number | null;
  slaStatus: string | null;
  slaHoursRemaining: number | null;
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

export interface TicketDepartmentHistoryEntry {
  historyId: string;
  ticketId: string;
  previousDepartmentId: string | null;
  previousDepartmentName: string | null;
  newDepartmentId: string | null;
  newDepartmentName: string | null;
  agentId: string | null;
  agentName: string | null;
  previousStatus: string | null;
  newStatus: string | null;
  actionType: string | null;
  changedAt: string;
  durationMinutes: number | null;
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
