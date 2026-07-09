import {
  FormControl,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";

import type { TicketPriority } from "./myTickets.types";

type Props = {
  value: TicketPriority;
  editing: boolean;
  onChange: (value: TicketPriority) => void;
};

const getColor = (
  priority: TicketPriority
):
  | "success"
  | "info"
  | "warning"
  | "error" => {
  switch (priority) {
    case "Critical":
      return "error";

    case "High":
      return "warning";

    case "Medium":
      return "info";

    default:
      return "success";
  }
};

const EditablePriority = ({
  value,
  editing,
  onChange,
}: Props) => {
  if (!editing) {
    return (
      <Chip
        label={value}
        color={getColor(value)}
        size="small"
      />
    );
  }

  return (
    <FormControl
      fullWidth
      size="small"
    >
      <Select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as TicketPriority)
        }
      >
        <MenuItem value="Low">
          Low
        </MenuItem>

        <MenuItem value="Medium">
          Medium
        </MenuItem>

        <MenuItem value="High">
          High
        </MenuItem>

        <MenuItem value="Critical">
          Critical
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default EditablePriority;