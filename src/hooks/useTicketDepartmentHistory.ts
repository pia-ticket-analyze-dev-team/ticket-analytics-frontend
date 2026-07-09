import { useEffect, useState } from "react";

import { fetchTicketDepartmentHistory } from "../api/tickets/tickets";
import type { TicketDepartmentHistoryEntry } from "../types/ticket";

export function useTicketDepartmentHistory(ticketId: string | null) {
  const [data, setData] = useState<TicketDepartmentHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId) {
      setData([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchTicketDepartmentHistory(ticketId)
      .then((result: TicketDepartmentHistoryEntry[]) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load department history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ticketId]);

  return { data, loading, error };
}
