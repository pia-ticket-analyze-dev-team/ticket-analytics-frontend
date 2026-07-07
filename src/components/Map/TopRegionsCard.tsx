import { Box, Chip, Paper, Typography } from "@mui/material";
import { topRegions } from "./dummyData";

const TopRegionsCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        p: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          mb: 4,
        }}
      >
        Top 3 Regions
      </Typography>

      {topRegions.map((region, index) => (
        <Box
          key={region.region}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: index !== topRegions.length - 1 ? 4 : 0,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1F2937",
              }}
            >
              #{index + 1} {region.region}
            </Typography>

            <Typography
              sx={{
                color: "#6B7280",
                mt: 0.5,
              }}
            >
              {region.tickets.toLocaleString()} Tickets
            </Typography>
          </Box>

          <Chip
            label={region.avgResolution}
            sx={{
              bgcolor: "#EEF4FF",
              color: "#2563EB",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: "999px",
            }}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default TopRegionsCard;