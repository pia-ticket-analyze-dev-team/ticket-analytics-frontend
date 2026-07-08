import { useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const profile = useMemo(() => {
    switch (user?.role) {
      case "ADMIN":
        return {
          name: "Admin",
          subtitle: "System Administrator",
        };

      case "FRONT_OFFICE":
        return {
          name: "Front Office",
          subtitle: "Front Office Agent",
        };

      case "AGENT":
        return {
          name: "Agent",
          subtitle: "Support Agent",
        };

      default:
        return {
          name: "",
          subtitle: "",
        };
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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

        {/* User */}

        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
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
            {profile.name.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {profile.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "#6B7280",
              }}
            >
              {profile.subtitle}
            </Typography>
          </Box>

          <KeyboardArrowDownIcon
            sx={{
              color: "#6B7280",
            }}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
