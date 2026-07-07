import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import {
  agentOptions,
  cityOptions,
  departmentOptions,
  issueTopicOptions,
} from "../../data/mockTickets";
import type { TicketPriority, TicketStatus } from "../../types/ticket";

export interface NewTicketInput {
  customer: string;
  description: string;
  issueTopic: string;
  department: string;
  city: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedAgent: string | null;
}

const priorityOptions: TicketPriority[] = ["HIGH", "MEDIUM", "LOW"];

const emptyForm: NewTicketInput = {
  customer: "",
  description: "",
  issueTopic: issueTopicOptions[0],
  department: departmentOptions[0],
  city: cityOptions[0],
  priority: "MEDIUM",
  status: "OPEN",
  assignedAgent: null,
};

const fieldSx = { display: "flex", flexDirection: "column", gap: 0.75 };
const labelSx = { fontSize: 13, color: "#6B7280", fontWeight: 500 };

interface AddTicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewTicketInput) => void;
}

const AddTicketDialog = ({ open, onClose, onSubmit }: AddTicketDialogProps) => {
  const [form, setForm] = useState<NewTicketInput>(emptyForm);

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.customer.trim()) return;
    onSubmit({ ...form, customer: form.customer.trim() });
    setForm(emptyForm);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>Add Ticket</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "8px !important" }}>
        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Customer</Typography>
          <TextField
            size="small"
            autoFocus
            placeholder="Customer name"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
          />
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Description</Typography>
          <TextField
            size="small"
            multiline
            minRows={3}
            placeholder="Describe the issue (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Issue Topic</Typography>
          <Select
            size="small"
            value={form.issueTopic}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, issueTopic: e.target.value })
            }
          >
            {issueTopicOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Department</Typography>
          <Select
            size="small"
            value={form.department}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, department: e.target.value })
            }
          >
            {departmentOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>City</Typography>
          <Select
            size="small"
            value={form.city}
            onChange={(e: SelectChangeEvent) => setForm({ ...form, city: e.target.value })}
          >
            {cityOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ ...fieldSx, flex: 1 }}>
            <Typography sx={labelSx}>Priority</Typography>
            <Select
              size="small"
              value={form.priority}
              onChange={(e: SelectChangeEvent) =>
                setForm({ ...form, priority: e.target.value as TicketPriority })
              }
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ ...fieldSx, flex: 1 }}>
            <Typography sx={labelSx}>Status</Typography>
            <Select size="small" value={form.status} disabled>
              <MenuItem value="OPEN" sx={{ fontSize: 14 }}>
                Open
              </MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Assigned Agent</Typography>
          <Select
            size="small"
            displayEmpty
            value={form.assignedAgent ?? ""}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, assignedAgent: e.target.value || null })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Unassigned
            </MenuItem>
            {agentOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={handleClose} sx={{ textTransform: "none", fontSize: 14, color: "#6B7280" }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!form.customer.trim()}
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: "#2463FF",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#1E53E5", boxShadow: "none" },
          }}
        >
          Add Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTicketDialog;
