import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const user = await login(email, password);

      switch (user.role) {
        case "ADMIN":
          navigate("/dashboard");
          break;

        case "FRONT_OFFICE":
          navigate("/customers");
          break;

        case "AGENT":
          navigate("/my-tickets");
          break;
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F4F6FA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: 430,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 5,
            }}
          >
            <LanguageOutlinedIcon
              sx={{
                fontSize: 56,
                color: "#071B4D",
                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 700,
                color: "#071B4D",
                lineHeight: 1,
              }}
            >
              Telco360
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: 2,
                color: "#6B7280",
                mb: 4,
              }}
            >
              INSIGHT CONSOLE
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Sign In
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#2463FF",
              "&:hover": {
                backgroundColor: "#1E54D9",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;