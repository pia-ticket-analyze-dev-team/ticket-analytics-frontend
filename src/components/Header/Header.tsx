import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useAuth } from "../../auth/AuthContext";

const DEPARTMENT_NAMES: Record<string, string> = {
  FRONT: "Front Office",
  NET: "Network Operations",
  FLDO: "Field Operations",
  IT: "IT",
  FIN: "Finance",
  TECH: "Technical Support",
  CREL: "Customer Relations",
};

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    navigate("/login");
  };

  const displayName = user?.name ?? "Guest";

  const displaySubtitle =
    user?.role === "ADMIN"
      ? "System Administrator"
      : (user?.departmentCode && DEPARTMENT_NAMES[user.departmentCode]) || "Agent";

  const avatarLetter = displayName.charAt(0).toUpperCase();

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
          justifyContent: "flex-end",
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
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
              {avatarLetter}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {displayName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                {displaySubtitle}
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
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutOutlinedIcon
                sx={{
                  fontSize: 18,
                  mr: 1.5,
                  color: "#6B7280",
                }}
              />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
