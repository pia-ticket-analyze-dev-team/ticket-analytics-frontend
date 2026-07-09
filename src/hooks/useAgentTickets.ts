import { useEffect, useState } from "react";

import { fetchAgentTickets } from "../api/agents/agents.js";
import type { PagedResponse } from "../components/Customer/customer.types";
import type { Ticket } from "../types/ticket";

interface UseAgentTicketsParams {
  agentId: string | null;
  page: number;
  size: number;
  status?: string;
  priority?: string;
  refreshKey?: number;
}

export function useAgentTickets({
  agentId,
  page,
  size,
  status,
  priority,
  refreshKey = 0,
}: UseAgentTicketsParams) {
  const [data, setData] = useState<PagedResponse<Ticket> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!agentId) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchAgentTickets(agentId, { page, size, status, priority })
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
  }, [agentId, page, size, status, priority, refreshKey]);

  return { data, loading, error };
}
