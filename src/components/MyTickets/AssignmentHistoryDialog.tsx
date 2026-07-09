import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useTicketDepartmentHistory } from "../../hooks/useTicketDepartmentHistory";

type Props = {
  open: boolean;
  ticketId: string | null;
  onClose: () => void;
};

const formatChangedAt = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const AssignmentHistoryDialog = ({
  open,
  ticketId,
  onClose,
}: Props) => {
  const { data: history, loading, error } = useTicketDepartmentHistory(
    open ? ticketId : null
  );

  if (!ticketId) return null;

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
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={28} />
            </Box>
          )}

          {!loading && error && (
            <Typography color="error" sx={{ py: 2 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && history.length === 0 && (
            <Typography color="text.secondary" sx={{ py: 2 }}>
              No department history available.
            </Typography>
          )}

          {!loading &&
            !error &&
            history.map((step, index) => (
              <Box key={step.historyId}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                >
                  {step.newDepartmentName ?? "Unknown Department"}
                </Typography>

                <Typography
                  sx={{
                    color: "#2463EB",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {step.agentName ?? "Unassigned"}
                </Typography>

                <Typography
                  sx={{
                    color: "#6B7280",
                    fontSize: 13,
                  }}
                >
                  {formatChangedAt(step.changedAt)}
                </Typography>

                {index !== history.length - 1 && (
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

                {index !== history.length - 1 && (
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