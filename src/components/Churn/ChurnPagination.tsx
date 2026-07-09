import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

type Props = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

const ChurnPagination = ({
  page,
  size,
  totalElements,
  totalPages,
  onPageChange,
  onSizeChange,
}: Props) => {
  const from = totalElements === 0 ? 0 : page * size + 1;
  const to = Math.min((page + 1) * size, totalElements);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        px: 1,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Showing {from} to {to} of {totalElements.toLocaleString()} entries
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Pagination
          count={Math.max(totalPages, 1)}
          page={page + 1}
          onChange={(_, value) => onPageChange(value - 1)}
          color="primary"
          shape="rounded"
        />

        <Select
          size="small"
          value={size}
          onChange={(e: SelectChangeEvent<number>) => onSizeChange(Number(e.target.value))}
          sx={{
            width: 90,
            height: 36,
          }}
        >
          <MenuItem value={10}>10/page</MenuItem>
          <MenuItem value={25}>25/page</MenuItem>
          <MenuItem value={50}>50/page</MenuItem>
          <MenuItem value={100}>100/page</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default ChurnPagination;
