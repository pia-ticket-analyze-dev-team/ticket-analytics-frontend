import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket";

const customers = [
  "Ahmet Yılmaz",
  "Mehmet Kaya",
  "Ayşe Demir",
  "Fatma Şahin",
  "Ali Çelik",
  "Zeynep Yıldız",
  "Hasan Özkan",
  "Elif Aksoy",
  "Emre Arslan",
  "Deniz Koç",
];

const issueTopics = [
  "İnternet Bağlantı Sorunu",
  "Fatura İtirazı",
  "Hız Problemi",
  "Modem Arızası",
  "Nakit İşlemleri",
];

const departments = [
  "Technical Support",
  "Billing",
  "Field Operations",
  "Customer Services",
];

const cities = ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"];

const agents = [
  "Mert Aydın",
  "Selin Kara",
  "Burak Şen",
  "Ceren Yılmaz",
  "Onur Doğan",
];

const priorities: TicketPriority[] = ["HIGH", "MEDIUM", "LOW"];
const statuses: TicketStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

const buildTicket = (index: number): Ticket => {
  const day = (index % 28) + 1;
  const hour = (index * 7) % 24;
  const minute = (index * 13) % 60;
  const status = statuses[index % statuses.length];
  const priority = priorities[index % priorities.length];

  return {
    ticketNo: `TCKT-2024-${pad(index + 1, 4)}`,
    customer: customers[index % customers.length],
    description: `${issueTopics[index % issueTopics.length]} reported by ${customers[index % customers.length]}.`,
    issueTopic: issueTopics[index % issueTopics.length],
    department: departments[index % departments.length],
    city: cities[index % cities.length],
    priority,
    status,
    slaBreached: priority === "HIGH" && status === "OPEN",
    createdAt: new Date(2024, 5, day, hour, minute),
    assignedAgent: index % 5 === 0 ? null : agents[index % agents.length],
  };
};

export const mockTickets: Ticket[] = Array.from({ length: 240 }, (_, i) =>
  buildTicket(i)
);

export const issueTopicOptions = issueTopics;
export const departmentOptions = departments;
export const cityOptions = cities;
export const agentOptions = agents;
