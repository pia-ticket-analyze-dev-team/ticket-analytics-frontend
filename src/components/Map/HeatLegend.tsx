import { Paper, Typography, Stack, Box } from "@mui/material";

const levels = [
  {
    label: "High",
    color: "#2463FF",
  },
  {
    label: "Medium",
    color: "#5B8CFF",
  },
  {
    label: "Low",
    color: "#DCEBFF",
  },
];

const HeatLegend = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          mb: 2,
        }}
      >
        Heat Levels
      </Typography>

      <Stack spacing={2}>
        {levels.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: item.color,
              }}
            />

            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default HeatLegend;