import {
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import type { CustomerTicketPriority } from "./customerTicket.types";

type Props = {
  value: CustomerTicketPriority;
  editing: boolean;
  onChange: (value: CustomerTicketPriority) => void;
};

const getColor = (
  priority: CustomerTicketPriority
) => {
  switch (priority) {
    case "HIGH":
      return {
        bgcolor: "#FEF2F2",
        color: "#DC2626",
      };

    case "MEDIUM":
      return {
        bgcolor: "#FFF7ED",
        color: "#D97706",
      };

    default:
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };
  }
};

const CustomerEditablePriority = ({
  value,
  editing,
  onChange,
}: Props) => {
  if (!editing) {
    return (
      <Chip
        label={value}
        size="small"
        sx={{
          fontWeight: 600,
          ...getColor(value),
        }}
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
          onChange(
            e.target.value as CustomerTicketPriority
          )
        }
      >
        <MenuItem value="LOW">
          LOW
        </MenuItem>

        <MenuItem value="MEDIUM">
          MEDIUM
        </MenuItem>

        <MenuItem value="HIGH">
          HIGH
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomerEditablePriority;