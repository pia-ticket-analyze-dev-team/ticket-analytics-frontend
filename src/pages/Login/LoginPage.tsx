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
import { keyframes } from "@mui/material/styles";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const rotate360 = keyframes`
  0% {
    transform: perspective(800px) rotateY(0deg);
  }
  100% {
    transform: perspective(800px) rotateY(360deg);
  }
`;

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

      // Admin
      if (user.agentId === null) {
        navigate("/dashboard");
      }
      // Front Office (Call Center Agent)
      else if (user.departmentCode === "FRONT") {
        navigate("/customers");
      }
      // Department Agents
      else {
        navigate("/my-tickets");
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
          width: 500,
          borderRadius: 5,
          boxShadow: "0px 18px 45px rgba(7,27,77,0.15)",
        }}
      >
        <CardContent sx={{ p: 7 }}>
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
                fontSize: 68,
                color: "#071B4D",
                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: 45,
                fontWeight: 800,
                color: "#071B4D",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box component="span">Telco360</Box>

            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                letterSpacing: 3,
                color: "#6B7280",
                mb: 4,
              }}
            >
              INSIGHT CONSOLE
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "#071B4D",
              }}
            >
              Access Portal
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 400,
                letterSpacing: 2,
                textAlign: "center",
                color: "#6B7280",
                mb: 4,
              }}
            >
              Sign in with your corporate
              <br />
              email and password.
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
              <CircularProgress size={22} color="inherit" />
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