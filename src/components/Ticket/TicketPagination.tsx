import {
  Box,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface TicketPaginationProps {
  page: number;
  totalPages: number;
  totalEntries: number;
  rangeStart: number;
  rangeEnd: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

const getPageItems = (page: number, totalPages: number): (number | "...")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = new Set<number>([1, 2, totalPages - 1, totalPages, page - 1, page, page + 1]);
  const sorted = [...items].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("...");
    result.push(p);
  });

  return result;
};

const TicketPagination = ({
  page,
  totalPages,
  totalEntries,
  rangeStart,
  rangeEnd,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}: TicketPaginationProps) => {
  const pageItems = getPageItems(page, totalPages);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        px: 1,
        py: 2.5,
      }}
    >
      <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
        Showing {rangeStart} to {rangeEnd} of {totalEntries.toLocaleString()} entries
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Box
          onClick={() => page > 1 && onPageChange(page - 1)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            cursor: page > 1 ? "pointer" : "default",
            color: page > 1 ? "#374151" : "#D1D5DB",
            "&:hover": page > 1 ? { backgroundColor: "#F3F4F6" } : undefined,
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </Box>

        {pageItems.map((item, idx) =>
          item === "..." ? (
            <Typography
              key={`ellipsis-${idx}`}
              sx={{ fontSize: 13, color: "#9CA3AF", px: 0.5 }}
            >
              ...
            </Typography>
          ) : (
            <Box
              key={item}
              onClick={() => onPageChange(item)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 32,
                height: 32,
                borderRadius: "8px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                color: item === page ? "#fff" : "#374151",
                backgroundColor: item === page ? "#2463FF" : "transparent",
                "&:hover": {
                  backgroundColor: item === page ? "#2463FF" : "#F3F4F6",
                },
              }}
            >
              {item}
            </Box>
          )
        )}

        <Box
          onClick={() => page < totalPages && onPageChange(page + 1)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            cursor: page < totalPages ? "pointer" : "default",
            color: page < totalPages ? "#374151" : "#D1D5DB",
            "&:hover": page < totalPages ? { backgroundColor: "#F3F4F6" } : undefined,
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </Box>
      </Box>

      <Select
        size="small"
        value={rowsPerPage}
        onChange={(e: SelectChangeEvent<number>) =>
          onRowsPerPageChange(Number(e.target.value))
        }
        sx={{
          fontSize: 13,
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
        }}
      >
        {rowsPerPageOptions.map((n) => (
          <MenuItem key={n} value={n} sx={{ fontSize: 13 }}>
            {n} / page
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TicketPagination;
