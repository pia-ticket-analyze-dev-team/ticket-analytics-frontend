import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import type { MyTicket } from "./myTickets.types";

type Props = {
  open: boolean;
  ticket: MyTicket | null;
  onClose: () => void;
};

const AssignmentHistoryDialog = ({
  open,
  ticket,
  onClose,
}: Props) => {
  if (!ticket) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 430,
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        Assignment History
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5}>
          <div>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: 13,
              }}
            >
              Previous Agent
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 17,
              }}
            >
              {ticket.previousAgent}
            </Typography>
          </div>

          <Divider />

          <div>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: 13,
              }}
            >
              Previous Department
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 17,
              }}
            >
              {ticket.previousDepartment}
            </Typography>
          </div>

          <Divider />

          <div>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: 13,
              }}
            >
              Changed At
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 17,
              }}
            >
              {ticket.changedAt}
            </Typography>
          </div>

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ pt: 1 }}
          >
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                px: 3,
              }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentHistoryDialog;