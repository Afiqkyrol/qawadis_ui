"use client";
import SmartTableList from "../../smart/tableList/smartTableList";
import { useSession } from "../../layout/innerLayout";
import { findMatchById, getMatchListByStatus } from "./activity.service";
import {
  IconBallFootball,
  IconCalendar,
  IconMapPin,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import SmartTitle from "../../smart/title/smartTitle";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, RingProgress, Text } from "@mantine/core";
import classes from "./activity.module.css";
import SmartRingProgress from "../../smart/ringProgress/smartRingProgress";
import SmartCard from "../../smart/card/smartCard";
import SmartTextView from "../../smart/textView/smartTextView";
import { DataFormatter } from "@/app/lib/util/dataFormatter";

const columnList = [
  {
    field: "sport",
    name: "Sport",
    icon: IconTrophy,
    iconColor: "blue",
  },
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
  const router = useRouter();

  const { data: matchList, isLoading: isLoadingMatchList } = useAsyncData(
    async () => {
      const response = await getMatchListByStatus(
        AppConstant.GSTS_ACTIVE,
        true,
        session?.apiToken
      );
      return response.map((match) => ({
        ...match,
        sport: match.sport.description,
        status: match.status.description,
        createdBy: match.createdBy.username,
      }));
    },
    { interval: 5000, autoFetch: true, deps: [session] }
  );

  const {
    data: matchDetails,
    isLoading: isLoadingMatchDetails,
    fetchData: fetchMatchDetails,
  } = useAsyncData(
    async (matchId) => {
      const response = await findMatchById(matchId, true, session?.apiToken);
      return {
        ...response,
        sport: response.sport.description,
        status: response.status.description,
        time: DataFormatter.formatTime(response.time),
        createdBy: response.createdBy.username,
      };
    },
    { autoFetch: false, deps: [session] }
  );

  const textViewData = [
    { label: "Sport", value: matchDetails?.sport ?? "-" },
    { label: "Venue", value: matchDetails?.venue ?? "-" },
    { label: "Created By", value: matchDetails?.createdBy ?? "-" },
    { label: "Date", value: matchDetails?.date ?? "-" },
    { label: "Date", value: matchDetails?.date ?? "-" },
    { label: "Time", value: matchDetails?.time ?? "-" },
    { label: "Status", value: matchDetails?.status ?? "-" },
  ];

  const onClickRow = async (matchId) => {
    await fetchMatchDetails(matchId);
    router.push(`/home/activity#details`);
  };

  return (
    <div>
      <SmartTitle title="Activity" Icon={IconBallFootball} />
      <SmartTableList
        primaryKey="matchId"
        columnList={columnList}
        dataList={matchList}
        tableType="Details"
        onClickRow={onClickRow}
        rowsPerPage={5}
        isLoading={isLoadingMatchList}
      />
      {!isLoadingMatchDetails && matchDetails?.matchId ? (
        <div
          id="details"
          style={{
            minHeight: "82vh",
            scrollMarginTop: "9rem",
          }}
        >
          <SmartCard>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <SmartRingProgress
                progressLabel="7/20"
                nameLabel="Player"
                currentValue={7}
                totalValue={20}
              />

              <div className={classes.textView} style={{ width: "100%" }}>
                <SmartTextView data={textViewData} columns={3} />
              </div>
            </div>
          </SmartCard>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
