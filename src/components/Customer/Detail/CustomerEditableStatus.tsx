import {
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import type { CustomerTicketStatus } from "./customerTicket.types";

type Props = {
  value: CustomerTicketStatus;
  editing: boolean;
  onChange: (value: CustomerTicketStatus) => void;
};

const getColor = (
  status: CustomerTicketStatus
) => {
  switch (status) {
    case "OPEN":
      return {
        bgcolor: "#FFF7ED",
        color: "#EA580C",
      };

    case "RESOLVED":
      return {
        bgcolor: "#ECFDF5",
        color: "#16A34A",
      };

    case "IN_PROGRESS":
      return {
        bgcolor: "#EFF6FF",
        color: "#2563EB",
      };

    default:
      return {
        bgcolor: "#F3F4F6",
        color: "#4B5563",
      };
  }
};

const CustomerEditableStatus = ({
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
            e.target.value as CustomerTicketStatus
          )
        }
      >
        <MenuItem value="OPEN">
          OPEN
        </MenuItem>

        <MenuItem value="IN_PROGRESS">
          IN PROGRESS
        </MenuItem>

        <MenuItem value="RESOLVED">
          RESOLVED
        </MenuItem>

        <MenuItem value="CLOSED">
          CLOSED
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomerEditableStatus;