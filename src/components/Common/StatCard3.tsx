import { Paper, Typography, Box } from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

interface StatCard3Props {
  title: string;
  value: string;
}

const StatCard3 = ({ title, value }: StatCard3Props) => {
  const getIcon = () => {
    switch (title) {
      case "Assigned Tickets":
        return <AssignmentOutlinedIcon fontSize="small" />;

      case "Open Tickets":
        return <MarkEmailUnreadOutlinedIcon fontSize="small" />;

      case "Active Tickets":
        return <AutorenewOutlinedIcon fontSize="small" />;

      default:
        return <AssignmentOutlinedIcon fontSize="small" />;
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

export default StatCard3;