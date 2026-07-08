import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  agentOptions,
  cityOptions,
  departmentOptions,
  issueTopicOptions,
} from "../../data/mockTickets";
import type { DateRange, TicketFilterState } from "../../types/ticket";
import DateRangePicker from "./DateRangePicker";

interface FilterFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterField = ({
  label,
  value,
  options,
  onChange,
}: FilterFieldProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 0.75,
      flex: "1 1 0",
      minWidth: 0,
    }}
  >
    <Typography
      sx={{
        fontSize: 13,
        color: "#6B7280",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {label}
    </Typography>

    <Select
      size="small"
      value={value}
      onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
      IconComponent={KeyboardArrowDownIcon}
      sx={{
        fontSize: 14,
        borderRadius: "8px",
        backgroundColor: "#fff",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#E5E7EB",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option} sx={{ fontSize: 14 }}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

interface TicketFiltersProps {
  filters: TicketFilterState;
  onChange: (filters: TicketFilterState) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClear: () => void;
}

const TicketFilters = ({
  filters,
  onChange,
  dateRange,
  onDateRangeChange,
  onClear,
}: TicketFiltersProps) => {
  const setField = (field: keyof TicketFilterState) => (value: string) =>
    onChange({ ...filters, [field]: value });

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        p: 3,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 2,
          overflowX: "auto",
          pb: 0.5,
        }}
      >
        <FilterField
          label="Status"
          value={filters.status}
          options={["All", "Open", "In Progress", "Resolved", "Closed"]}
          onChange={setField("status")}
        />

        <FilterField
          label="Priority"
          value={filters.priority}
          options={["All", "High", "Medium", "Low"]}
          onChange={setField("priority")}
        />

        <FilterField
          label="Issue Topic"
          value={filters.issueTopic}
          options={["All", ...issueTopicOptions]}
          onChange={setField("issueTopic")}
        />

        <FilterField
          label="Department"
          value={filters.department}
          options={["All", ...departmentOptions]}
          onChange={setField("department")}
        />

        <FilterField
          label="City"
          value={filters.city}
          options={["All", ...cityOptions]}
          onChange={setField("city")}
        />

        <FilterField
          label="SLA Breached"
          value={filters.slaBreached}
          options={["All", "Yes", "No"]}
          onChange={setField("slaBreached")}
        />

        <FilterField
          label="Assigned Agent"
          value={filters.assignedAgent}
          options={["All", "Unassigned", ...agentOptions]}
          onChange={setField("assignedAgent")}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            Created Date
          </Typography>

          <DateRangePicker
            value={dateRange}
            onChange={onDateRangeChange}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            onClick={onClear}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#6B7280",
              textTransform: "none",
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketFilters;
