import { useEffect, useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerFilters from "../../components/Customer/CustomerFilters";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerPagination from "../../components/Customer/CustomerPagination";
import CustomerFormDialog from "../../components/Customer/Form/CustomerFormDialog";

import { useCustomers } from "../../hooks/useCustomers";

import type { Customer } from "../../components/Customer/customer.types";

const CustomerPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [segment, setSegment] = useState("All");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [formTarget, setFormTarget] =
    useState<"create" | Customer | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, loading, error } = useCustomers({
    page,
    size,
    search: debouncedSearch,
    segment: segment === "All" ? "" : segment,
    refreshKey,
  });

  const handleSegmentChange = (value: string) => {
    setSegment(value);
    setPage(0);
  };

  return (
    <MainLayout>
      <CustomerHeader
        onAddClick={() => setFormTarget("create")}
      />

      <CustomerFilters
        search={search}
        setSearch={setSearch}
        segment={segment}
        setSegment={handleSegmentChange}
      />

      <CustomerTable
        customers={data?.content ?? []}
        loading={loading}
        error={error}
        onEdit={setFormTarget}
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

      <CustomerFormDialog
        open={formTarget !== null}
        onClose={() => setFormTarget(null)}
        onSaved={() =>
          setRefreshKey((key) => key + 1)
        }
        customer={
          typeof formTarget === "object"
            ? formTarget
            : undefined
        }
      />
    </MainLayout>
  );
};

export default CustomerPage;
