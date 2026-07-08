import { useState } from "react";
import {
  Autocomplete,
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
import { createTicket } from "../../api/tickets/tickets.js";
import { useAgents } from "../../hooks/useAgents";
import { useCustomerSearch } from "../../hooks/useCustomerSearch";
import { useDepartments } from "../../hooks/useDepartments";
import { useInfrastructureTypes } from "../../hooks/useInfrastructureTypes";
import { useIssueTopics } from "../../hooks/useIssueTopics";
import { useRegions } from "../../hooks/useRegions";
import { useServiceTypes } from "../../hooks/useServiceTypes";
import { toApiDateTime } from "../../utils/date";
import type { Customer } from "../../components/Customer/customer.types";
import type { TicketPriority } from "../../types/ticket";

export interface NewCustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  segment: string;
}

interface TicketFormState {
  customer: string;
  customerId: string | null;
  description: string;
  issueTopic: string;
  department: string;
  city: string;
  serviceType: string;
  infrastructureType: string;
  priority: TicketPriority;
  assignedAgent: string;
}

const priorityOptions: TicketPriority[] = ["High", "Medium", "Low", "Critical"];
const segmentOptions = ["Individual", "Corporate", "SME"];

const emptyForm: TicketFormState = {
  customer: "",
  customerId: null,
  description: "",
  issueTopic: "",
  department: "",
  city: "",
  serviceType: "",
  infrastructureType: "",
  priority: "Medium",
  assignedAgent: "",
};

const emptyNewCustomerDetails: NewCustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  birthdate: "",
  segment: "",
};

const getCustomerLabel = (customer: Customer) => `${customer.firstName} ${customer.lastName}`;

const fieldSx = { display: "flex", flexDirection: "column", gap: 0.75 };
const labelSx = { fontSize: 13, color: "#6B7280", fontWeight: 500 };

interface AddTicketDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const AddTicketDialog = ({ open, onClose, onCreated }: AddTicketDialogProps) => {
  const { data: issueTopics } = useIssueTopics();
  const { data: departments } = useDepartments();
  const { data: regions } = useRegions();
  const { data: agents } = useAgents();
  const { data: serviceTypes } = useServiceTypes();
  const { data: infrastructureTypes } = useInfrastructureTypes();

  const [form, setForm] = useState<TicketFormState>(emptyForm);
  const [customerInput, setCustomerInput] = useState("");
  const [newCustomerDetails, setNewCustomerDetails] = useState<NewCustomerDetails>(
    emptyNewCustomerDetails
  );
  const { results: customerResults, loading: customerSearchLoading } =
    useCustomerSearch(customerInput);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isNewCustomer = customerInput.trim() !== "" && form.customerId === null;

  const isNewCustomerValid =
    newCustomerDetails.firstName.trim() !== "" &&
    newCustomerDetails.lastName.trim() !== "" &&
    newCustomerDetails.email.trim() !== "" &&
    newCustomerDetails.address.trim() !== "";

  const missingFields: string[] = [];
  if (form.customer.trim() === "") missingFields.push("Customer");
  if (isNewCustomer && !isNewCustomerValid) {
    missingFields.push("New customer details (first/last name, email, address)");
  }
  if (form.issueTopic === "") missingFields.push("Issue Topic");
  if (form.department === "") missingFields.push("Department");
  if (form.city === "") missingFields.push("City");
  if (form.serviceType === "") missingFields.push("Service Type");
  if (form.infrastructureType === "") missingFields.push("Infrastructure Type");
  if (form.assignedAgent === "") missingFields.push("Assigned Agent");

  const canSubmit = missingFields.length === 0 && !submitting;

  const resetState = () => {
    setForm(emptyForm);
    setCustomerInput("");
    setNewCustomerDetails(emptyNewCustomerDetails);
    setSubmitError(null);
  };

  const handleClose = () => {
    if (submitting) return;
    resetState();
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const topicId = issueTopics?.find((t) => t.name === form.issueTopic)?.id;
    const currentDepartmentId = departments?.find((d) => d.name === form.department)?.id;
    const regionId = regions?.find((r) => r.name === form.city)?.id;
    const serviceTypeId = serviceTypes?.find((s) => s.name === form.serviceType)?.id;
    const infrastructureTypeId = infrastructureTypes?.find(
      (i) => i.name === form.infrastructureType
    )?.id;
    const agentId = agents?.find((a) => a.name === form.assignedAgent)?.id;

    if (
      !topicId ||
      !currentDepartmentId ||
      !regionId ||
      !serviceTypeId ||
      !infrastructureTypeId ||
      !agentId
    ) {
      setSubmitError("Couldn't resolve one of the selected options. Please try again.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    createTicket({
      customerId: form.customerId,
      newCustomer: isNewCustomer
        ? {
            firstName: newCustomerDetails.firstName.trim(),
            lastName: newCustomerDetails.lastName.trim(),
            email: newCustomerDetails.email.trim(),
            address: newCustomerDetails.address.trim(),
            birthdate: newCustomerDetails.birthdate || null,
            phone: newCustomerDetails.phone.trim() || null,
            segment: newCustomerDetails.segment || null,
          }
        : null,
      topicId,
      currentDepartmentId,
      regionId,
      serviceTypeId,
      infrastructureTypeId,
      agentId,
      description: form.description.trim() || null,
      status: "OPEN",
      priority: form.priority,
      slaBreached: false,
      resolutionTimeHours: null,
      customerSatisfactionScore: null,
      createdAt: toApiDateTime(new Date()),
      resolvedAt: null,
    })
      .then(() => {
        resetState();
        onCreated();
      })
      .catch(() => setSubmitError("Couldn't create ticket. Please try again."))
      .finally(() => setSubmitting(false));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>Add Ticket</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "8px !important" }}>
        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Customer</Typography>
          <Autocomplete<Customer, false, false, true>
            freeSolo
            size="small"
            options={customerResults}
            loading={customerSearchLoading}
            filterOptions={(options) => options}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : getCustomerLabel(option)
            }
            inputValue={customerInput}
            onInputChange={(_, newInputValue) => {
              setCustomerInput(newInputValue);
              setForm((prev) => ({ ...prev, customer: newInputValue, customerId: null }));
            }}
            onChange={(_, newValue) => {
              if (newValue && typeof newValue !== "string") {
                setForm((prev) => ({
                  ...prev,
                  customer: getCustomerLabel(newValue),
                  customerId: newValue.id,
                }));
              }
            }}
            renderInput={(params) => (
              <TextField {...params} autoFocus placeholder="Search customer name" />
            )}
          />
        </Box>

        {isNewCustomer && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              bgcolor: "#F9FAFB",
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
              No matching customer — enter new customer details
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ ...fieldSx, flex: 1 }}>
                <Typography sx={labelSx}>First Name</Typography>
                <TextField
                  size="small"
                  value={newCustomerDetails.firstName}
                  onChange={(e) =>
                    setNewCustomerDetails({ ...newCustomerDetails, firstName: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ ...fieldSx, flex: 1 }}>
                <Typography sx={labelSx}>Last Name</Typography>
                <TextField
                  size="small"
                  value={newCustomerDetails.lastName}
                  onChange={(e) =>
                    setNewCustomerDetails({ ...newCustomerDetails, lastName: e.target.value })
                  }
                />
              </Box>
            </Box>

            <Box sx={fieldSx}>
              <Typography sx={labelSx}>Email</Typography>
              <TextField
                size="small"
                type="email"
                value={newCustomerDetails.email}
                onChange={(e) =>
                  setNewCustomerDetails({ ...newCustomerDetails, email: e.target.value })
                }
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ ...fieldSx, flex: 1 }}>
                <Typography sx={labelSx}>Phone</Typography>
                <TextField
                  size="small"
                  value={newCustomerDetails.phone}
                  onChange={(e) =>
                    setNewCustomerDetails({ ...newCustomerDetails, phone: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ ...fieldSx, flex: 1 }}>
                <Typography sx={labelSx}>Birthdate</Typography>
                <TextField
                  size="small"
                  type="date"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={newCustomerDetails.birthdate}
                  onChange={(e) =>
                    setNewCustomerDetails({ ...newCustomerDetails, birthdate: e.target.value })
                  }
                />
              </Box>
            </Box>

            <Box sx={fieldSx}>
              <Typography sx={labelSx}>Address</Typography>
              <TextField
                size="small"
                value={newCustomerDetails.address}
                onChange={(e) =>
                  setNewCustomerDetails({ ...newCustomerDetails, address: e.target.value })
                }
              />
            </Box>

            <Box sx={fieldSx}>
              <Typography sx={labelSx}>Segment</Typography>
              <Select
                size="small"
                displayEmpty
                value={newCustomerDetails.segment}
                onChange={(e: SelectChangeEvent) =>
                  setNewCustomerDetails({ ...newCustomerDetails, segment: e.target.value })
                }
              >
                <MenuItem value="" sx={{ fontSize: 14 }}>
                  Select a segment
                </MenuItem>
                {segmentOptions.map((option) => (
                  <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        )}

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
            displayEmpty
            value={form.issueTopic}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, issueTopic: e.target.value })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select a topic
            </MenuItem>
            {(issueTopics ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Department</Typography>
          <Select
            size="small"
            displayEmpty
            value={form.department}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, department: e.target.value })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select a department
            </MenuItem>
            {(departments ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>City</Typography>
          <Select
            size="small"
            displayEmpty
            value={form.city}
            onChange={(e: SelectChangeEvent) => setForm({ ...form, city: e.target.value })}
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select a city
            </MenuItem>
            {(regions ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Service Type</Typography>
          <Select
            size="small"
            displayEmpty
            value={form.serviceType}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, serviceType: e.target.value })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select a service type
            </MenuItem>
            {(serviceTypes ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={fieldSx}>
          <Typography sx={labelSx}>Infrastructure Type</Typography>
          <Select
            size="small"
            displayEmpty
            value={form.infrastructureType}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, infrastructureType: e.target.value })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select an infrastructure type
            </MenuItem>
            {(infrastructureTypes ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
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
            <Select size="small" value="OPEN" disabled>
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
            value={form.assignedAgent}
            onChange={(e: SelectChangeEvent) =>
              setForm({ ...form, assignedAgent: e.target.value })
            }
          >
            <MenuItem value="" sx={{ fontSize: 14 }}>
              Select an agent
            </MenuItem>
            {(agents ?? []).map((option) => (
              <MenuItem key={option.id} value={option.name} sx={{ fontSize: 14 }}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {!submitting && missingFields.length > 0 && (
          <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
            Still needed: {missingFields.join(", ")}
          </Typography>
        )}

        {submitError && (
          <Typography color="error" sx={{ fontSize: 13 }}>
            {submitError}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={handleClose} sx={{ textTransform: "none", fontSize: 14, color: "#6B7280" }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!canSubmit}
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: "#2463FF",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#1E53E5", boxShadow: "none" },
          }}
        >
          {submitting ? "Creating..." : "Add Ticket"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTicketDialog;
