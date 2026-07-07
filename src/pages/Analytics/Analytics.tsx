import { useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MainLayout from "../../components/Layout/MainLayout";
import ChartAsyncContent from "../../components/Dashboard/ChartAsyncContent";
import AgentPerformanceCards from "../../components/Analytics/AgentPerformanceCards";
import TicketPagination from "../../components/Ticket/TicketPagination";
import { useAgentPerformance } from "../../hooks/useAgentPerformance";

const ROWS_PER_PAGE_OPTIONS = [6, 9, 12];

const Analytics = () => {
  const agentPerformance = useAgentPerformance();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  return (
    <MainLayout>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          AgentAnalytics
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#9CA3AF", mt: 0.5 }}>
           Analytics for Agents
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
            Agent Performance (Last 30 Days)
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 260,
              backgroundColor: "#F5F7FA",
              borderRadius: 3,
              px: 2,
              py: 0.8,
            }}
          >
            <SearchIcon sx={{ color: "#9CA3AF", mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search agents..."
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              sx={{ fontSize: 14 }}
            />
          </Box>
        </Box>

        <ChartAsyncContent
          loading={agentPerformance.loading}
          error={agentPerformance.error}
          data={agentPerformance.data}
          skeletonHeight={300}
        >
          {(response) => {
            const query = search.trim().toLowerCase();
            const filtered = query
              ? response.content.filter((agent) =>
                  agent.agentName.toLowerCase().includes(query)
                )
              : response.content;

            const totalEntries = filtered.length;
            const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
            const safePage = Math.min(page, totalPages);
            const rangeStart = totalEntries === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
            const rangeEnd = Math.min(safePage * rowsPerPage, totalEntries);
            const paged = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

            return (
              <>
                <AgentPerformanceCards
                  agents={paged}
                  emptyMessage={
                    query
                      ? `No agents match "${search.trim()}".`
                      : "No agent activity in the last 30 days."
                  }
                />

                {totalEntries > 0 && (
                  <TicketPagination
                    page={safePage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    onPageChange={setPage}
                    onRowsPerPageChange={(next) => {
                      setRowsPerPage(next);
                      setPage(1);
                    }}
                  />
                )}
              </>
            );
          }}
        </ChartAsyncContent>
      </Box>
    </MainLayout>
  );
};

export default Analytics;
