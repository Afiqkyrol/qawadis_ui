"use client";
import { useEffect } from "react";
import SmartTableList from "../../smart/tableList/smartTableList";

export default function ActivityClient() {
  useEffect(() => {}, []);

  const columnList = [
    { field: "id", name: "ID" },
    { field: "name", name: "Name" },
    { field: "status", name: "Status" },
  ];

  const dataList = [
    { id: 1, name: "Activity 1", status: "Active" },
    { id: 2, name: "Activity 2", status: "Inactive" },
    { id: 3, name: "Activity 3", status: "Active" },
  ];

  return <SmartTableList dataList={dataList} columnList={columnList} />;
}
