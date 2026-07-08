import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

import { useAuth } from "../../auth/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.agentId === null;
  const isFrontOffice =
    user?.agentId !== null && user?.departmentCode === "FRONT";
  const isAgent =
    user?.agentId !== null && user?.departmentCode !== "FRONT";

  const menuItems = [
    // ADMIN
    ...(isAdmin
      ? [
          {
            title: "Dashboard",
            icon: <DashboardOutlinedIcon />,
            path: "/dashboard",
          },
          {
            title: "Customers",
            icon: <GroupsOutlinedIcon />,
            path: "/customers",
          },
          {
            title: "Tickets",
            icon: <ConfirmationNumberOutlinedIcon />,
            path: "/tickets",
          },
          {
            title: "Agent Analytics",
            icon: <BarChartOutlinedIcon />,
            path: "/agent-analytics",
          },
          {
            title: "Customer Churn",
            icon: <TrendingDownOutlinedIcon />,
            path: "/churn-analysis",
          },
          {
            title: "Regional Insights",
            icon: <PublicOutlinedIcon />,
            path: "/regional-insights",
          },
        ]
      : []),

    // FRONT OFFICE
    ...(isFrontOffice
      ? [
          {
            title: "Customers",
            icon: <GroupsOutlinedIcon />,
            path: "/customers",
          },
          {
            title: "Tickets",
            icon: <ConfirmationNumberOutlinedIcon />,
            path: "/tickets",
          },
        ]
      : []),

    // DEPARTMENT AGENT
    ...(isAgent
      ? [
          {
            title: "My Tickets",
            icon: <AssignmentOutlinedIcon />,
            path: "/my-tickets",
          },
        ]
      : []),
  ];

  return (
    <Box
      sx={{
        width: 245,
        background: "linear-gradient(180deg,#071B4D 0%,#05163E 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            pt: 4,
            pb: 5,
          }}
        >
          <LanguageOutlinedIcon sx={{ fontSize: 34 }} />

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 21,
                lineHeight: 1.1,
              }}
            >
              Telco360
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                opacity: 0.75,
                letterSpacing: 1,
              }}
            >
              INSIGHT CONSOLE
            </Typography>
          </Box>
        </Box>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.title}
                component={NavLink}
                to={item.path}
                sx={{
                  mb: 1,
                  borderRadius: "10px",
                  height: 48,
                  bgcolor: isActive ? "#2463FF" : "transparent",
                  "&:hover": {
                    bgcolor: isActive
                      ? "#2463FF"
                      : "rgba(255,255,255,.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;