import { useState } from "react";

import MainLayout from "../../components/Layout/MainLayout";

import MyTicketsHeader from "../../components/MyTickets/MyTicketsHeader";
import MyTicketsStats from "../../components/MyTickets/MyTicketsStats";
import MyTicketsFilters from "../../components/MyTickets/MyTicketsFilters";
import MyTicketsTable from "../../components/MyTickets/MyTicketsTable";

const MyTicketsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  return (
    <MainLayout>
      <MyTicketsHeader />

      <MyTicketsStats />

      <MyTicketsFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <MyTicketsTable
        search={search}
        status={status}
        priority={priority}
      />
    </MainLayout>
  );
};

export default MyTicketsPage;