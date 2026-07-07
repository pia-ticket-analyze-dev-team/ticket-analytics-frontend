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
        height: "100%",
        border: "1px solid #E5E7EB",
        borderRadius: "20px",
        p: 2.5,
        backgroundColor: "#FFFFFF",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        transition: "0.2s",

        "&:hover": {
          boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: "#6B7280",
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: "#F3F4F6",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& svg": {
                fontSize: 24,
              },
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;