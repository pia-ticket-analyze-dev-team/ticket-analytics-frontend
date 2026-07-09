import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
  icon?: ReactNode;
}

const StatCard = ({
  title,
  value,
  color = "#111827",
  icon,
}: StatCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 200,
        border: "1px solid #E5E7EB",
        borderRadius: "30px",
        p: 3,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "0.2s",

        "&:hover": {
          boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: "#6B7280",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: 42,
          fontWeight: 700,
          color,
          lineHeight: 1,
          mt: "auto",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;