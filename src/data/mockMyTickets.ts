import type { MyTicket } from "../components/MyTickets/myTickets.types";

export const myTickets: MyTicket[] = [
  {
    id: 1,
    ticketNo: "TK-10001",
    customer: "Ahmet Yılmaz",
    topic: "Internet Connection",
    priority: "High",
    status: "In Progress",
    createdAt: "07.07.2026",
    sla: "3h Left",

    previousAgent: "Sarah Johnson",
    previousDepartment: "Call Center",
    changedAt: "07.07.2026 09:15",
  },
  {
    id: 2,
    ticketNo: "TK-10002",
    customer: "Ayşe Demir",
    topic: "Billing Issue",
    priority: "Medium",
    status: "Open",
    createdAt: "06.07.2026",
    sla: "8h Left",

    previousAgent: "Michael Brown",
    previousDepartment: "Billing",
    changedAt: "06.07.2026 14:42",
  },
  {
    id: 3,
    ticketNo: "TK-10003",
    customer: "Mehmet Kaya",
    topic: "SIM Activation",
    priority: "Low",
    status: "Resolved",
    createdAt: "05.07.2026",
    sla: "Completed",

    previousAgent: "Emily Davis",
    previousDepartment: "Technical Support",
    changedAt: "05.07.2026 11:20",
  },
  {
    id: 4,
    ticketNo: "TK-10004",
    customer: "Fatma Şahin",
    topic: "Network Outage",
    priority: "Critical",
    status: "In Progress",
    createdAt: "04.07.2026",
    sla: "Breached",

    previousAgent: "Daniel Wilson",
    previousDepartment: "Network Operations",
    changedAt: "04.07.2026 18:10",
  },
  {
    id: 5,
    ticketNo: "TK-10005",
    customer: "Ali Çelik",
    topic: "SIM Replacement",
    priority: "High",
    status: "Open",
    createdAt: "03.07.2026",
    sla: "5h Left",

    previousAgent: "Olivia Taylor",
    previousDepartment: "Retail Support",
    changedAt: "03.07.2026 10:05",
  },
];