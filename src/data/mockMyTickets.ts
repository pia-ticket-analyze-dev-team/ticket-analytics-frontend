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

    forwardedTo: "Technical Support",
    assignedAgent: "Mehmet Kaya",

    assignmentHistory: [
      {
        department: "Front Office",
        agent: "Ayşe Demir",
        changedAt: "07.07.2026 08:45",
      },
      {
        department: "Technical Support",
        agent: "Mehmet Kaya",
        changedAt: "07.07.2026 09:15",
      },
    ],
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

    forwardedTo: "Billing",
    assignedAgent: "Michael Brown",

    assignmentHistory: [
      {
        department: "Front Office",
        agent: "Ali Kaya",
        changedAt: "06.07.2026 09:10",
      },
      {
        department: "Billing",
        agent: "Michael Brown",
        changedAt: "06.07.2026 10:25",
      },
    ],
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

    forwardedTo: "SIM Operations",
    assignedAgent: "Burak Çetin",

    assignmentHistory: [
      {
        department: "Front Office",
        agent: "Zeynep Arslan",
        changedAt: "05.07.2026 08:40",
      },
      {
        department: "SIM Operations",
        agent: "Burak Çetin",
        changedAt: "05.07.2026 10:45",
      },
    ],
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

    forwardedTo: "Network Operations",
    assignedAgent: "Sarah Johnson",

    assignmentHistory: [
      {
        department: "Front Office",
        agent: "Ayşe Demir",
        changedAt: "04.07.2026 14:00",
      },
      {
        department: "Network Operations",
        agent: "Sarah Johnson",
        changedAt: "04.07.2026 17:10",
      },
    ],
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

    forwardedTo: "Retail Support",
    assignedAgent: "Olivia Taylor",

    assignmentHistory: [
      {
        department: "Front Office",
        agent: "Selin Aydın",
        changedAt: "03.07.2026 08:20",
      },
      {
        department: "Retail Support",
        agent: "Olivia Taylor",
        changedAt: "03.07.2026 09:40",
      },
    ],
  },
];