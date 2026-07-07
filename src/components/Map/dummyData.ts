export interface CityStat {
  city: string;
  tickets: number;
  avgResolution: string;
}

export const cityData: CityStat[] = [
  { city: "Istanbul", tickets: 124, avgResolution: "2.1 h" },
  { city: "Ankara", tickets: 96, avgResolution: "2.4 h" },
  { city: "Izmir", tickets: 74, avgResolution: "2.7 h" },
  { city: "Bursa", tickets: 58, avgResolution: "3.0 h" },
  { city: "Antalya", tickets: 47, avgResolution: "3.2 h" },
];