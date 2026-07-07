import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

type CustomerDeleteTicketDialogProps = {
  open: boolean;
  ticketNo: string;
  onClose: () => void;
  onDelete: () => void;
};

const CustomerDeleteTicketDialog = ({
  open,
  ticketNo,
  onClose,
  onDelete,
}: CustomerDeleteTicketDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: 420,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 30,
          pb: 1,
        }}
      >
        Delete {ticketNo}?
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 16,
            mb: 4,
          }}
        >
          This ticket will be permanently removed from the list.
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            variant="text"
            onClick={onClose}
            sx={{
              textTransform: "none",
              color: "#6B7280",
              fontWeight: 600,
              px: 3,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 4,
              fontWeight: 600,
            }}
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDeleteTicketDialog;