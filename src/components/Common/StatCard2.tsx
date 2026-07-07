import { Paper, Typography, Box } from "@mui/material";

import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: StatCardProps) => {
  const getIcon = () => {
    switch (title) {
      case "Total Tickets":
        return <ConfirmationNumberOutlinedIcon fontSize="small" />;

      case "Active Cities":
        return <LocationOnOutlinedIcon fontSize="small" />;

      case "Success Rate":
        return <TaskAltOutlinedIcon fontSize="small" />;

      case "Avg Resolution":
        return <TimerOutlinedIcon fontSize="small" />;

      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        height: 120,
        display: "flex",
        flexDirection: "column",
        transition: ".2s",

        "&:hover": {
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "#EEF4FF",
            color: "#2463FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: 20,
            },
          }}
        >
          {getIcon()}
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1,
          mt: 0.5,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;