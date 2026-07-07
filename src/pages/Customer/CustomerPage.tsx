import MainLayout from "../../components/Layout/MainLayout";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerFilters from "../../components/Customer/CustomerFilters";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerPagination from "../../components/Customer/CustomerPagination";

const CustomerPage = () => {
  return (
    <MainLayout>
      <CustomerHeader />
      <CustomerFilters />
      <CustomerTable />
      <CustomerPagination />
    </MainLayout>
  );
};

export default CustomerPage;