import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    active: false,
  },
  {
    title: "Customers",
    icon: <GroupsOutlinedIcon />,
    active: true,
  },
  {
    title: "Tickets",
    icon: <ConfirmationNumberOutlinedIcon />,
    active: false,
  },
  {
    title: "Analytics",
    icon: <BarChartOutlinedIcon />,
    active: false,
  },
  {
    title: "Reports",
    icon: <DescriptionOutlinedIcon />,
    active: false,
  },
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    active: false,
  },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 245,
        background:
          "linear-gradient(180deg,#071B4D 0%,#05163E 100%)",
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
              Telecom
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                opacity: .75,
                letterSpacing: 1,
              }}
            >
              INSIGHT CONSOLE
            </Typography>
          </Box>
        </Box>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.title}
              sx={{
                mb: 1,
                borderRadius: "10px",
                height: 48,

                bgcolor: item.active
                  ? "#2463FF"
                  : "transparent",

                "&:hover": {
                  bgcolor: item.active
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
                  fontWeight: item.active ? 600 : 500,
                }}
              />
            </ListItemButton>
          ))}
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