"use client";
import SmartTableList from "../../lib/component/smart/tableList/smartTableList";
import { useSession } from "../../lib/component/layout/innerLayout";
import { getMatchListByStatus } from "./activity.service";
import {
  IconBallFootball,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconPlus,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import SmartTitle from "../../lib/component/smart/title/smartTitle";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useEffect } from "react";
import { Box, Divider } from "@mantine/core";
import { DataFormatter } from "@/app/lib/util/dataFormatter";
import { nprogress } from "@mantine/nprogress";
import SmartButton from "../../lib/component/smart/button/smartButton";
import SearchMatchForm from "../../lib/component/form/activity/searchMatchForm";
import { useLookupData } from "@/app/lib/hook/useLookupData";
import SmartBreadcrumbs from "@/app/lib/component/smart/breadCrumbs/smartBreadCrumbs";
import { useNavigate } from "@/app/lib/hook/useNavigate";

const items = [{ title: "Activity", href: "/home/activity" }];

const columnMatchList = [
  {
    field: "sport",
    name: "Sport",
    icon: IconTrophy,
    iconColor: "blue",
  },
  { field: "date", name: "Date", icon: IconCalendar, iconColor: "green" },
  { field: "time", name: "Time", icon: IconClock, iconColor: "orange" },
  { field: "venue", name: "Venue", icon: IconMapPin, iconColor: "red" },
  { field: "statusDesc", name: "Status" },
  {
    field: "createdBy",
    name: "Created By",
    icon: IconUser,
    iconColor: "yellow",
  },
];

export default function ActivityClient() {
  const session = useSession();
  const { goTo } = useNavigate();

  const { data: sportList, isLoading: isLoadingSportList } = useLookupData(
    AppConstant.LT_SPORT_TABLE,
    session?.apiToken
  );

  const { data: statusList, isLoading: isLoadingStatusList } = useLookupData(
    AppConstant.LT_GENERAL_STATUS_TABLE,
    session?.apiToken
  );

  const {
    data: matchList,
    isLoading: isLoadingMatchList,
    request: fetchMatchList,
  } = useAsyncData(
    async (form) => {
      const response = await getMatchListByStatus(
        form?.sportId,
        form?.venue,
        form?.date,
        form?.time,
        form?.statusId,
        true,
        session?.apiToken
      );
      return response.map((match) => ({
        ...match,
        sport: match.sport.description,
        date: DataFormatter.formatDate(match.date),
        time: DataFormatter.formatTime(match.time),
        statusDesc: match.status.description,
        createdBy: match.createdBy.username,
      }));
    },
    { interval: 5000, autoFetch: false, deps: [session] }
  );

  const onClickRow = async (matchId) => {
    goTo(`/home/activity/${matchId}`);
  };

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <>
      <SmartTitle title="Activity" Icon={IconBallFootball} />
      <SmartBreadcrumbs itemList={items} />
      <Divider my="xs" label="Search Match" labelPosition="center" />
      <SearchMatchForm
        request={fetchMatchList}
        sportList={sportList}
        statusList={statusList}
        isLoadingRequest={isLoadingMatchList}
      />
      <Box style={{ textAlign: "right" }}>
        <SmartButton
          text="Create Match"
          style={{
            marginBottom: "1rem",
          }}
          variant="outline"
          icon={<IconPlus size={14} />}
          // loading={loadingSearch}
          submitHandler={async () => {
            goTo("/home/activity/new-activity");
          }}
        />
      </Box>
      <SmartTableList
        primaryKey="matchId"
        columnList={columnMatchList}
        dataList={matchList}
        tableType="Details"
        onClickRow={onClickRow}
        rowsPerPage={5}
        isLoading={isLoadingMatchList}
        noDataText="No activity available"
      />
    </>
  );
}
