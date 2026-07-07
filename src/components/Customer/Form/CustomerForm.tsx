import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

interface CustomerFormProps {
  isEdit?: boolean;
}

const CustomerForm = ({ isEdit = false }: CustomerFormProps) => {
  const customer = isEdit
    ? {
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        phone: "532 123 45 67",
        segment: "Individual",
        city: "İstanbul",
        address: "Kadıköy / İstanbul",
      }
    : {
        name: "",
        email: "",
        phone: "",
        segment: "",
        city: "",
        address: "",
      };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 5,
        borderRadius: 5,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#1F2937",
        }}
      >
        Customer Information
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        <TextField
          label="Customer Name"
          defaultValue={customer.name}
          fullWidth
        />

        <TextField
          label="Email"
          defaultValue={customer.email}
          fullWidth
        />

        <TextField
          label="Phone"
          defaultValue={customer.phone}
          fullWidth
        />

        <TextField
          select
          label="Segment"
          defaultValue={customer.segment}
          fullWidth
        >
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Corporate">Corporate</MenuItem>
          <MenuItem value="SME">SME</MenuItem>
        </TextField>

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              md: "span 2",
            },
          }}
        >
          <TextField
            label="City"
            defaultValue={customer.city}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              md: "span 2",
            },
          }}
        >
          <TextField
            label="Address"
            defaultValue={customer.address}
            multiline
            minRows={4}
            fullWidth
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 5,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            minWidth: 140,
            height: 46,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            minWidth: 180,
            height: 46,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {isEdit ? "Save Changes" : "Create Customer"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomerForm;