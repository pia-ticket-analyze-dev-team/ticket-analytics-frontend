import { Box, Button, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetailHeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/customers")}
          sx={{
            mb: 2,
            px: 0,
            textTransform: "none",
            color: "#6B7280",

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
            mb: 0.5,
          }}
        >
          Customer Detail
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 15,
          }}
        >
          View customer information and ticket history.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<EditOutlinedIcon />}
        onClick={() => navigate(`/customers/${id}/edit`)}
        sx={{
          textTransform: "none",
          borderRadius: "10px",
          px: 3,
          py: 1.2,
          fontWeight: 600,
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        }}
      >
        Edit Customer
      </Button>
    </Box>
  );
};

export default CustomerDetailHeader;