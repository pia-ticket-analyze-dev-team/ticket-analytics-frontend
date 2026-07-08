import { fetchRegionalInsights } from "../api/regionalInsights/regionalInsights.js";
import type { RegionalInsights } from "../types/regionalInsights";
import { useAsyncData } from "./useAsyncData";

export const useRegionalInsights = () =>
  useAsyncData<RegionalInsights>(fetchRegionalInsights, "Couldn't load regional insights.");
