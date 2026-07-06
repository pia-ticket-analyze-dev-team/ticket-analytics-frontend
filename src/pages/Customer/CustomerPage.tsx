import MainLayout from "../../components/Layout/MainLayout";
import { Typography } from "@mui/material";

const CustomerPage = () => {
  return (
    <MainLayout>
      <Typography variant="h4" sx={{ p: 4 }}>
        Customers
      </Typography>
    </MainLayout>
  );
};

export default CustomerPage;