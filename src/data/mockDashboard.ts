export interface StatTileData {
  label: string;
  value: string;
  delta: string;
  deltaGood: boolean;
  comparisonLabel: string;
}

export const statTiles: StatTileData[] = [
  {
    label: "Total Customers",
    value: "10,000",
    delta: "+12.4%",
    deltaGood: true,
    comparisonLabel: "vs last month",
  },
  {
    label: "Total Tickets",
    value: "28,430",
    delta: "+8.7%",
    deltaGood: true,
    comparisonLabel: "vs last month",
  },
  {
    label: "Open Tickets",
    value: "6,245",
    delta: "+5.1%",
    deltaGood: false,
    comparisonLabel: "vs last month",
  },
  {
    label: "SLA Breach Rate",
    value: "2.35%",
    delta: "+0.6%",
    deltaGood: false,
    comparisonLabel: "vs last month",
  },
  {
    label: "Avg. Resolution Time",
    value: "14.6h",
    delta: "-2.4h",
    deltaGood: true,
    comparisonLabel: "vs last month",
  },
  {
    label: "Customer Satisfaction",
    value: "4.32 / 5",
    delta: "+0.12",
    deltaGood: true,
    comparisonLabel: "vs last month",
  },
];

export interface TicketVolumePoint {
  label: string;
  value: number;
}

export const ticketVolumeSeries: TicketVolumePoint[] = [
  { label: "1 May", value: 3450 },
  { label: "4 May", value: 3180 },
  { label: "8 May", value: 4720 },
  { label: "11 May", value: 4380 },
  { label: "15 May", value: 5540 },
  { label: "18 May", value: 6680 },
  { label: "22 May", value: 4520 },
  { label: "25 May", value: 5910 },
  { label: "29 May", value: 6240 },
  { label: "31 May", value: 7310 },
];

export interface TicketStatusSlice {
  label: string;
  value: number;
  color: string;
}

export const ticketStatusBreakdown: TicketStatusSlice[] = [
  { label: "Open", value: 6245, color: "#eb6834" },
  { label: "In Progress", value: 9312, color: "#2a78d6" },
  { label: "Resolved", value: 9845, color: "#008300" },
  { label: "Closed", value: 3028, color: "#4B5563" },
];

export interface RegionTicketCount {
  label: string;
  value: number;
}

export const ticketsByRegion: RegionTicketCount[] = [
  { label: "İstanbul", value: 7842 },
  { label: "Ankara", value: 4921 },
  { label: "İzmir", value: 3654 },
  { label: "Bursa", value: 2431 },
  { label: "Antalya", value: 1842 },
];

export interface IssueTopicCount {
  label: string;
  value: number;
}

export const topIssueTopics: IssueTopicCount[] = [
  { label: "İnternet Bağlantı Sorunu", value: 8125 },
  { label: "Fatura İtirazı", value: 5612 },
  { label: "Hız Problemi", value: 4231 },
  { label: "Modem Arızası", value: 3245 },
  { label: "Nakil İşlemleri", value: 2987 },
];

export interface DepartmentWorkloadCount {
  label: string;
  value: number;
}

export const departmentWorkload: DepartmentWorkloadCount[] = [
  { label: "Ön Büro", value: 5612 },
  { label: "Saha Ekibi", value: 4231 },
  { label: "Teknik Destek", value: 7842 },
  { label: "Network", value: 6125 },
  { label: "Faturalama", value: 4620 },
];

export const slaBreachRate = {
  value: 2.35,
  max: 10,
  delta: "+0.6%",
  comparisonLabel: "vs last month",
};
