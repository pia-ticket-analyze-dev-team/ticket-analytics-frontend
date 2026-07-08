import { useEffect, useState } from "react";

import { fetchTickets } from "../api/tickets/tickets.js";
import type { PagedResponse } from "../components/Customer/customer.types";
import type { Ticket } from "../types/ticket";

interface UseTicketsParams {
  page: number;
  size: number;
  status?: string;
  priority?: string;
  topicId?: string;
  departmentId?: string;
  regionId?: string;
  slaBreached?: boolean;
  agentId?: string;
  startDate?: string;
  endDate?: string;
  refreshKey?: number;
}

export function useTickets(params: UseTicketsParams) {
  const [data, setData] = useState<PagedResponse<Ticket> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    page,
    size,
    status,
    priority,
    topicId,
    departmentId,
    regionId,
    slaBreached,
    agentId,
    startDate,
    endDate,
    refreshKey = 0,
  } = params;

  useEffect(() => {
    let cancelled = false;

    fetchTickets({
      page,
      size,
      status,
      priority,
      topicId,
      departmentId,
      regionId,
      slaBreached,
      agentId,
      startDate,
      endDate,
    })
      .then((result: PagedResponse<Ticket>) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load tickets.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, size, status, priority, topicId, departmentId, regionId, slaBreached, agentId, startDate, endDate, refreshKey]);

  return { data, loading, error };
}
