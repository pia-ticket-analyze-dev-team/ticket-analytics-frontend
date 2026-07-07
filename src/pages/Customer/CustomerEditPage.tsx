import MainLayout from "../../components/Layout/MainLayout";

import CustomerForm from "../../components/Customer/Form/CustomerForm";
import CustomerFormHeader from "../../components/Customer/Form/CustomerFormHeader";

const CustomerEditPage = () => {
  return (
    <MainLayout>
      <CustomerFormHeader
        title="Edit Customer"
        description="Update customer information."
      />

      <CustomerForm isEdit />
    </MainLayout>
  );
};

export default CustomerEditPage;