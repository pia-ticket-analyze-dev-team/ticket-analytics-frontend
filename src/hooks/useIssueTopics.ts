import { fetchIssueTopics } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useIssueTopics = () =>
  useAsyncData<LookupOption[]>(fetchIssueTopics, "Couldn't load issue topics.");
