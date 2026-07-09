import {
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import type { TicketStatus } from "./myTickets.types";

type Props = {
  value: TicketStatus;
  editing: boolean;
  onChange: (value: TicketStatus) => void;
};

const getColor = (
  status: TicketStatus
):
  | "success"
  | "warning"
  | "info" => {
  switch (status) {
    case "Resolved":
      return "success";

    case "In Progress":
      return "warning";

    default:
      return "info";
  }
};

const EditableStatus = ({
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
          onChange(e.target.value as TicketStatus)
        }
      >
        <MenuItem value="Open">
          Open
        </MenuItem>

        <MenuItem value="In Progress">
          In Progress
        </MenuItem>

        <MenuItem value="Resolved">
          Resolved
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default EditableStatus;