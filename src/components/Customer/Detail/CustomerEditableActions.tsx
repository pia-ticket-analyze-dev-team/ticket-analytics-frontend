import { IconButton, Stack } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type Props = {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const CustomerEditableActions = ({
  editing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={1}
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
        <>
          <IconButton
            size="small"
            onClick={onEdit}
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={onDelete}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default CustomerEditableActions;