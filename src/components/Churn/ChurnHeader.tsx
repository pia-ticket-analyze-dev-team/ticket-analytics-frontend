import { Box, Typography } from "@mui/material";

const ChurnHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1F2937",
            mb: 0.5,
          }}
        >
          Customer Churn Analysis
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 15,
          }}
        >
          Identify customers at risk of churn using ticket history,
          satisfaction scores and resolution performance.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChurnHeader;