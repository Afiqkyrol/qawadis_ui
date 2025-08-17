"use client";
import { useEffect, useRef, useState } from "react";
import SmartTableList from "../../smart/tableList/smartTableList";
import { useSession } from "../../layout/innerLayout";
import { getMatchListByStatus } from "./activity.service";

export default function ActivityClient() {
  const session = useSession();
  const fetchedRef = useRef(false);
  const [matcheList, setMatcheList] = useState([]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchData() {
      const response = await getMatchListByStatus(1, true, session?.apiToken);
      const transformed = response.map((match) => ({
        ...match,
        sport: match.sport.description,
        status: match.status.description,
        createdBy: match.createdBy.username,
      }));
      setMatcheList(transformed);
    }

    fetchData();
  }, [session]);

  const columnList = [
    { field: "matchId", name: "ID" },
    { field: "sport", name: "Sport" },
    { field: "date", name: "Date" },
    { field: "venue", name: "Venue" },
    { field: "status", name: "Status" },
    { field: "createdBy", name: "Created By" },
  ];

  const dataList = [
    { id: 1, name: "Activity 1", status: "Active" },
    { id: 2, name: "Activity 2", status: "Inactive" },
    { id: 3, name: "Activity 3", status: "Active" },
  ];

  return <SmartTableList columnList={columnList} dataList={matcheList} />;
}
