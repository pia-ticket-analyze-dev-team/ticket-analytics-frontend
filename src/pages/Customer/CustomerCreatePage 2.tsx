import MainLayout from "../../components/Layout/MainLayout";

import CustomerForm from "../../components/Customer/Form/CustomerForm";
import CustomerFormHeader from "../../components/Customer/Form/CustomerFormHeader";

const CustomerCreatePage = () => {
  return (
    <MainLayout>
      <CustomerFormHeader
        title="Add Customer"
        description="Create a new customer record."
      />

      <CustomerForm />
    </MainLayout>
  );
};

export default CustomerCreatePage;