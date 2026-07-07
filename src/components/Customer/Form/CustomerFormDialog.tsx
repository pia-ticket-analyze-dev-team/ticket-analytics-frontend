import { Dialog, DialogContent } from "@mui/material";

import CustomerForm from "./CustomerForm";

type CustomerFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const CustomerFormDialog = ({ open, onClose, onCreated }: CustomerFormDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent sx={{ p: 0 }}>
        <CustomerForm
          onCancel={onClose}
          onSuccess={onCreated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
