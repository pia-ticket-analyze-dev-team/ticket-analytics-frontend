import { fetchKpiSummary } from "../api/dashboard/dashboard.js";
import type { KpiSummary } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useKpiSummary = () =>
  useAsyncData<KpiSummary>(fetchKpiSummary, "Couldn't load dashboard KPIs.");
