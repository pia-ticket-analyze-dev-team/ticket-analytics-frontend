import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import MainLayout from "../../components/Layout/MainLayout";

const TicketEditPage = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Edit Ticket
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Ticket No: {id}
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default TicketEditPage;