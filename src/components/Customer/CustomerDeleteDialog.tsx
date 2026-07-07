import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  customerName: string;
  onClose: () => void;
  onDelete: () => void;
};

const CustomerDeleteDialog = ({
  open,
  customerName,
  onClose,
  onDelete,
}: Props) => {
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
        Delete {customerName}?
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 16,
            mb: 4,
          }}
        >
          This customer will be permanently removed from the list.
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
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
            }}
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDeleteDialog;