"use client";
import { useEffect, useRef, useState } from "react";
import SmartTableList from "../../smart/tableList/smartTableList";
import { useSession } from "../../layout/innerLayout";
import { getMatchListByStatus } from "./activity.service";
import {
  IconBallFootball,
  IconCalendar,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";
import SmartTitle from "../../smart/title/smartTitle";

const columnList = [
  { field: "sport", name: "Sport", icon: IconBallFootball, iconColor: "blue" },
  { field: "date", name: "Date", icon: IconCalendar, iconColor: "green" },
  { field: "venue", name: "Venue", icon: IconMapPin, iconColor: "red" },
  { field: "status", name: "Status" },
  {
    field: "createdBy",
    name: "Created By",
    icon: IconUser,
    iconColor: "violet",
  },
];

export default function ActivityClient() {
  const session = useSession();
  const fetchedRef = useRef(false);
  const [matchList, setMatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setMatchList(transformed);

      setIsLoading(false);
    }

    fetchData();
  }, [session]);

  return (
    <div>
      <SmartTitle title="Activity" Icon={IconBallFootball} />
      <SmartTableList
        columnList={columnList}
        dataList={matchList}
        rowsPerPage={5}
        isLoading={isLoading}
      />
    </div>
  );
}
