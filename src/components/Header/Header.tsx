import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  const notificationCount = 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#111827",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar
        sx={{
          height: 72,
          display: "flex",
          justifyContent: "space-between",
          px: 4,
        }}
      >
        {/* Search */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 360,
            backgroundColor: "#F5F7FA",
            borderRadius: 3,
            px: 2,
            py: 0.8,
          }}
        >
          <SearchIcon
            sx={{
              color: "#9CA3AF",
              mr: 1,
            }}
          />

          <InputBase
            placeholder="Search customers, tickets..."
            fullWidth
            sx={{
              fontSize: 14,
            }}
          />
        </Box>

        {/* Right Section */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Badge
            badgeContent={notificationCount}
            color="error"
            invisible={notificationCount === 0}
          >
            <NotificationsNoneIcon
              sx={{
                fontSize: 25,
                cursor: "pointer",
              }}
            />
          </Badge>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: "#2563EB",
                fontWeight: 600,
              }}
            >
              A
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Admin User
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                System Administrator
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                color: "#6B7280",
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;