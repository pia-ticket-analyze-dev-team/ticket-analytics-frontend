import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const CustomerPagination = () => {
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
        Showing 1 to 5 of 10,000 entries
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Pagination
          count={5}
          page={1}
          color="primary"
          shape="rounded"
        />

        <Select
          size="small"
          defaultValue={10}
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

export default CustomerPagination;