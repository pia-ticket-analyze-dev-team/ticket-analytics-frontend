import { IconButton, Stack } from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type Props = {
  editing: boolean;
  onView: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onForward: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

const EditableActions = ({
  editing,
  onView,
  onEdit,
  onSave,
  onCancel,
  onForward,
}: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      sx={{ width: "100%" }}
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
            onClick={onView}
          >
            <VisibilityOutlinedIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={onEdit}
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton
            color="primary"
            size="small"
            onClick={onForward}
          >
            <ForwardOutlinedIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default EditableActions;