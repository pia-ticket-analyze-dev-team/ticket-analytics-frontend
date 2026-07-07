import MainLayout from "../../components/Layout/MainLayout";

import CustomerDetailHeader from "../../components/Customer/Detail/CustomerDetailHeader";
import CustomerOverview from "../../components/Customer/Detail/CustomerOverview";
import CustomerTicketTable from "../../components/Customer/Detail/CustomerTicketTable";

const CustomerDetailPage = () => {
  return (
    <MainLayout>
      <CustomerDetailHeader />

      <CustomerOverview />

      <CustomerTicketTable />
    </MainLayout>
  );
};

export default CustomerDetailPage;