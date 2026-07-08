import { IconButton, Stack } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type Props = {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const CustomerEditableActions = ({
  editing,
  onEdit,
  onSave,
  onCancel,
}: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      {editing ? (
        <>
          <IconButton
            color="success"
            size="small"
            onClick={onSave}
          >
            <CheckOutlinedIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={onCancel}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </>
      ) : (
        <IconButton
          size="small"
          onClick={onEdit}
        >
          <EditOutlinedIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default CustomerEditableActions;