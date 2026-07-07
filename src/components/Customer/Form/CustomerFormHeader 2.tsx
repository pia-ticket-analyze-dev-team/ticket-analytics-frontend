import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

interface CustomerFormHeaderProps {
  title: string;
  description: string;
}

const CustomerFormHeader = ({
  title,
  description,
}: CustomerFormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box>
        <Button
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14 }} />}
          onClick={() => navigate("/customers")}
          sx={{
            textTransform: "none",
            color: "#6B7280",
            mb: 2,
            px: 0,

            "&:hover": {
              background: "transparent",
            },
          }}
        >
          Back to Customers
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1F2937",
            mb: .5,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 15,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomerFormHeader;