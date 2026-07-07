import { useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";

import ChurnHeader from "../../components/Churn/ChurnHeader";
import ChurnFilters from "../../components/Churn/ChurnFilters";
import ChurnTable from "../../components/Churn/ChurnTable";

const ChurnPage = () => {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [riskLevel, setRiskLevel] = useState("All");

  return (
    <MainLayout>
      <ChurnHeader />

      <ChurnFilters
        search={search}
        setSearch={setSearch}
        segment={segment}
        setSegment={setSegment}
        riskLevel={riskLevel}
        setRiskLevel={setRiskLevel}
      />

      <ChurnTable
        search={search}
        segment={segment}
        riskLevel={riskLevel}
      />
    </MainLayout>
  );
};

export default ChurnPage;