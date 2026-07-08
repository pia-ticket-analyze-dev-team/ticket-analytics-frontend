import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
          width: 500,
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
        Assignment Journey
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {ticket.assignmentHistory.map((step, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                {step.department}
              </Typography>

              <Typography
                sx={{
                  color: "#2463EB",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {step.agent}
              </Typography>

              <Typography
                sx={{
                  color: "#6B7280",
                  fontSize: 13,
                }}
              >
                {step.changedAt}
              </Typography>

              {index !==
                ticket.assignmentHistory.length - 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 1,
                  }}
                >
                  <ArrowDownwardIcon
                    sx={{
                      color: "#9CA3AF",
                    }}
                  />
                </Box>
              )}

              {index !==
                ticket.assignmentHistory.length - 1 && (
                <Divider sx={{ mt: 1 }} />
              )}
            </Box>
          ))}

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                borderRadius: 3,
                px: 3,
                textTransform: "none",
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