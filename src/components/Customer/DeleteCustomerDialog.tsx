import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { deleteCustomer } from "../../api/customers/customers.js";
import type { Customer } from "./customer.types";

type DeleteCustomerDialogProps = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onDeleted: () => void;
};

const DeleteCustomerDialog = ({ open, customer, onClose, onDeleted }: DeleteCustomerDialogProps) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleDelete = () => {
    if (!customer || deleting) return;

    setDeleting(true);
    setError(null);

    deleteCustomer(customer.id)
      .then(() => {
        onDeleted();
        onClose();
      })
      .catch(() => setError("Couldn't delete customer. Please try again."))
      .finally(() => setDeleting(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Delete Customer</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete{" "}
          {customer ? `${customer.firstName} ${customer.lastName}` : "this customer"}? This
          action cannot be undone.
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={handleClose}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          disabled={deleting}
          variant="contained"
          color="error"
          sx={{ textTransform: "none" }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCustomerDialog;
