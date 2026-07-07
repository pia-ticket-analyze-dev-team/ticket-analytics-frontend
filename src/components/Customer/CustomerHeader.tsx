import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type CustomerHeaderProps = {
  onAddClick: () => void;
};

const CustomerHeader = ({ onAddClick }: CustomerHeaderProps) => {
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1F2937",
            mb: 0.5,
          }}
        >
          Customers
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 15,
          }}
        >
          Manage customer records and account information.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
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
        Add Customer
      </Button>
    </Box>
  );
};

export default CustomerHeader;