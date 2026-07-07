import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createCustomer } from "../../../api/customers/customers.js";

interface CustomerFormProps {
  isEdit?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

interface CustomerFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  segment: string;
  address: string;
  birthdate: string;
}

const emptyForm: CustomerFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  segment: "",
  address: "",
  birthdate: "",
};

const editMockForm: CustomerFormState = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
  email: "ahmet@example.com",
  phone: "532 123 45 67",
  segment: "Individual",
  address: "Kadıköy / İstanbul",
  birthdate: "1990-01-01",
};

const CustomerForm = ({ isEdit = false, onCancel, onSuccess }: CustomerFormProps) => {
  const navigate = useNavigate();
  const handleCancel = onCancel ?? (() => navigate("/customers"));

  const [form, setForm] = useState<CustomerFormState>(isEdit ? editMockForm : emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (field: keyof CustomerFormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.address.trim() !== "";

  const handleSubmit = () => {
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    createCustomer({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      segment: form.segment || null,
      address: form.address.trim(),
      birthdate: form.birthdate || null,
    })
      .then(() => {
        setForm(emptyForm);
        onSuccess?.();
        handleCancel();
      })
      .catch(() => setError("Couldn't create customer. Please try again."))
      .finally(() => setSubmitting(false));
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
          label="First Name"
          value={form.firstName}
          onChange={(e) => setField("firstName")(e.target.value)}
          fullWidth
        />

        <TextField
          label="Last Name"
          value={form.lastName}
          onChange={(e) => setField("lastName")(e.target.value)}
          fullWidth
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setField("email")(e.target.value)}
          fullWidth
        />

        <TextField
          label="Phone"
          value={form.phone}
          onChange={(e) => setField("phone")(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Segment"
          value={form.segment}
          onChange={(e) => setField("segment")(e.target.value)}
          fullWidth
        >
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Corporate">Corporate</MenuItem>
          <MenuItem value="SME">SME</MenuItem>
        </TextField>

        <TextField
          label="Birthdate"
          type="date"
          value={form.birthdate}
          onChange={(e) => setField("birthdate")(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />

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
            value={form.address}
            onChange={(e) => setField("address")(e.target.value)}
            multiline
            minRows={4}
            fullWidth
          />
        </Box>
      </Box>

      {error && (
        <Typography
          color="error"
          sx={{ mt: 3 }}
        >
          {error}
        </Typography>
      )}

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
          onClick={handleCancel}
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
          onClick={isEdit ? undefined : handleSubmit}
          disabled={!isEdit && (!isValid || submitting)}
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
          {isEdit ? "Save Changes" : submitting ? "Creating..." : "Create Customer"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomerForm;
