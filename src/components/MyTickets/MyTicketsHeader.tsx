import { Box, Typography } from "@mui/material";

const MyTicketsHeader = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: 40,
          fontWeight: 700,
          color: "#1F2937",
        }}
      >
        My Tickets
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#6B7280",
          fontSize: 16,
        }}
      >
        View and manage tickets assigned to you.
      </Typography>
    </Box>
  );
};

export default MyTicketsHeader;