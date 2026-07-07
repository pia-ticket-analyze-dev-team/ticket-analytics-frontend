import { Dialog, DialogContent } from "@mui/material";

import CustomerForm from "./CustomerForm";
import type { Customer } from "../customer.types";

type CustomerFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  customer?: Customer;
};

const CustomerFormDialog = ({ open, onClose, onSaved, customer }: CustomerFormDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent sx={{ p: 0 }}>
        <CustomerForm
          isEdit={Boolean(customer)}
          customer={customer}
          onCancel={onClose}
          onSuccess={onSaved}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
