import { fetchTopIssueTopics } from "../api/dashboard/dashboard.js";
import type { NamedCount } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useTopIssueTopics = () =>
  useAsyncData<NamedCount[]>(fetchTopIssueTopics, "Couldn't load top issue topics.");
