import { useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerFilters from "../../components/Customer/CustomerFilters";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerPagination from "../../components/Customer/CustomerPagination";

const CustomerPage = () => {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [city, setCity] = useState("All");

  return (
    <MainLayout>
      <CustomerHeader />

      <CustomerFilters
        search={search}
        setSearch={setSearch}
        segment={segment}
        setSegment={setSegment}
        city={city}
        setCity={setCity}
      />

      <CustomerTable
        search={search}
        segment={segment}
        city={city}
      />

      <CustomerPagination />
    </MainLayout>
  );
};

export default CustomerPage;