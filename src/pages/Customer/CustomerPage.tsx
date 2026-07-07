import { useEffect, useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerFilters from "../../components/Customer/CustomerFilters";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerPagination from "../../components/Customer/CustomerPagination";
import { useCustomers } from "../../hooks/useCustomers";

const CustomerPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [city, setCity] = useState("All");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, loading, error } = useCustomers({ page, size, search: debouncedSearch });

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
        customers={data?.content ?? []}
        loading={loading}
        error={error}
        segment={segment}
        city={city}
      />

      <CustomerPagination
        page={data?.page ?? page}
        size={data?.size ?? size}
        totalElements={data?.totalElements ?? 0}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
        onSizeChange={(newSize) => {
          setSize(newSize);
          setPage(0);
        }}
      />
    </MainLayout>
  );
};

export default CustomerPage;
