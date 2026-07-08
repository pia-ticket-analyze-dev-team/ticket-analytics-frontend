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
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

import { useAuth } from "../../auth/AuthContext";
import type { UserRole } from "../../auth/auth.types";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    path: "/dashboard",
    roles: ["ADMIN"],
  },
  {
    title: "Customers",
    icon: <GroupsOutlinedIcon />,
    path: "/customers",
    roles: ["ADMIN", "FRONT_OFFICE"],
  },
  {
    title: "Tickets",
    icon: <ConfirmationNumberOutlinedIcon />,
    path: "/tickets",
    roles: ["ADMIN", "FRONT_OFFICE"],
  },
  {
    title: "My Tickets",
    icon: <AssignmentOutlinedIcon />,
    path: "/my-tickets",
    roles: ["AGENT"],
  },
  {
    title: "Agent Analytics",
    icon: <BarChartOutlinedIcon />,
    path: "/agent-analytics",
    roles: ["ADMIN"],
  },
  {
    title: "Customer Churn",
    icon: <TrendingDownOutlinedIcon />,
    path: "/churn-analysis",
    roles: ["ADMIN"],
  },
  {
    title: "Regional Insights",
    icon: <PublicOutlinedIcon />,
    path: "/regional-insights",
    roles: ["ADMIN"],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <Box
      sx={{
        width: 245,
        background: "linear-gradient(180deg,#071B4D 0%,#05163E 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
          {filteredMenuItems.map((item) => {
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

      <Box sx={{ p: 2 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,.08)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <KeyboardArrowLeftOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Collapse"
            primaryTypographyProps={{
              fontSize: 14,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;