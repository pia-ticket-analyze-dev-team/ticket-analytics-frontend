import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const menuItems = [
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
    title: "My Tickets",
    icon: <AssignmentIndOutlinedIcon />,
    path: "/my-tickets",
  },
  {
    title: "Agent Analytics",
    icon: <BarChartOutlinedIcon />,
    path: "/analytics",
  },
  {
    title: "Customer Churn Risk",
    icon: <PersonOffOutlinedIcon />,
    path: "/customer-churn-risk",
  },
  {
    title: "Regional Insights",
    icon: <PublicOutlinedIcon />,
    path: "/regional-insights",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.departmentCode === null;
  const isFrontOfficeAgent = user?.departmentCode === "FRONT";
  const isDepartmentAgent =
    user?.departmentCode !== null &&
    user?.departmentCode !== "FRONT";

  const visibleMenuItems = menuItems.filter((item) => {
    // Admin
    if (isAdmin) {
      return item.path !== "/my-tickets";
    }

    // Front Office
    if (isFrontOfficeAgent) {
      return (
        item.path === "/customers" ||
        item.path === "/tickets"
      );
    }

    // Department Agents
    if (isDepartmentAgent) {
      return item.path === "/my-tickets";
    }

    return false;
  });

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
          {visibleMenuItems.map((item) => {
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