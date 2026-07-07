export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthdate: string | null;
  phone: string;
  createdAt: string;
  segment: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CustomerTicket {
  id: string;
  ticketNumber: string;
  issueTopicName: string | null;
  departmentName: string | null;
  status: string;
  priority: string;
  createdAt: string;
}

export interface CustomerTicketStats {
  totalTickets: number;
  openTickets: number;
  slaBreachCount: number;
  averageSatisfactionScore: number;
}
