import { useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";

import ChurnHeader from "../../components/Churn/ChurnHeader";
import ChurnFilters from "../../components/Churn/ChurnFilters";
import ChurnTable from "../../components/Churn/ChurnTable";
import ChurnPagination from "../../components/Churn/ChurnPagination";
import { useChurnCustomers } from "../../hooks/useChurnCustomers";
import { useChurnFilterOptions } from "../../hooks/useChurnFilterOptions";

const ChurnPage = () => {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [riskLevel, setRiskLevel] = useState("All");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);

  const { data, loading, error } = useChurnCustomers({
    page,
    size,
    segment: segment === "All" ? undefined : segment,
    riskLevel: riskLevel === "All" ? undefined : riskLevel,
  });
  const { segments, riskLevels } = useChurnFilterOptions();

  return (
    <MainLayout>
      <ChurnHeader />

      <ChurnFilters
        search={search}
        setSearch={setSearch}
        segment={segment}
        setSegment={(value) => {
          setSegment(value);
          setPage(0);
        }}
        riskLevel={riskLevel}
        setRiskLevel={(value) => {
          setRiskLevel(value);
          setPage(0);
        }}
        segmentOptions={segments}
        riskLevelOptions={riskLevels}
      />

      <ChurnTable
        customers={data?.content ?? []}
        loading={loading}
        error={error}
        search={search}
      />

      <ChurnPagination
        page={data?.number ?? page}
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

export default ChurnPage;
