import { Paper, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatCard = ({
  title,
  value,
  color = "#111827",
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
        justifyContent: "space-between",

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

      <Typography
        sx={{
          fontSize: 42,
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