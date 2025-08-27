"use client";
import SmartTableList from "../../smart/tableList/smartTableList";
import { useSession } from "../../layout/innerLayout";
import {
  findMatchById,
  getMatchListByStatus,
  getPlayerListByMatchId,
  saveUserMatch,
} from "./activity.service";
import {
  IconArrowRight,
  IconBallFootball,
  IconCalendar,
  IconMapPin,
  IconPlayFootball,
  IconTrophy,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import SmartTitle from "../../smart/title/smartTitle";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "@mantine/core";
import SmartRingProgress from "../../smart/ringProgress/smartRingProgress";
import SmartCard from "../../smart/card/smartCard";
import SmartTextView from "../../smart/textView/smartTextView";
import { DataFormatter } from "@/app/lib/util/dataFormatter";
import { nprogress } from "@mantine/nprogress";
import SmartButton from "../../smart/button/smartButton";

const columnMatchList = [
  {
    field: "sport",
    name: "Sport",
    icon: IconTrophy,
    iconColor: "blue",
  },
  { field: "date", name: "Date", icon: IconCalendar, iconColor: "green" },
  { field: "venue", name: "Venue", icon: IconMapPin, iconColor: "red" },
  { field: "statusDesc", name: "Status" },
  {
    field: "createdBy",
    name: "Created By",
    icon: IconUser,
    iconColor: "yellow",
  },
];
const columnPlayerList = [
  {
    field: "player",
    name: "Player",
    icon: IconPlayFootball,
    iconColor: "violet",
  },
  {
    field: "createdAt",
    name: "Joined at",
    icon: IconCalendar,
    iconColor: "green",
  },
  {
    field: "statusDesc",
    name: "Status",
  },
];

const safe = (val) => val ?? "-";

export default function ActivityClient() {
  const session = useSession();
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [joinedUserMatchId, setJoinedUserMatchId] = useState(null);

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
        statusDesc: match.status.description,
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
        statusDesc: response.status.description,
        date: DataFormatter.formatDate(response.date),
        time: DataFormatter.formatTime(response.time),
        createdBy: response.createdBy.username,
      };
    },
    { autoFetch: false, deps: [session] }
  );

  const {
    data: playerList,
    isLoading: isLoadingPlayerList,
    fetchData: fetchPlayerList,
  } = useAsyncData(
    async (matchId) => {
      const response = await getPlayerListByMatchId(
        matchId,
        AppConstant.GSTS_ACTIVE,
        true,
        session?.apiToken
      );
      const um = response.find(
        (um) => um.player.userId === session.user.userId
      );

      setJoinedUserMatchId(um ? um.userMatchId : null);
      setIsUserJoined(um?.status.statusId === AppConstant.GSTS_ACTIVE);

      return response.map((userMatch) => ({
        ...userMatch,
        player: userMatch.player.username,
        statusDesc: userMatch.status.description,
        createdAt: DataFormatter.formatDateTime(userMatch.createdAt),
      }));
    },
    { interval: 5000, autoFetch: false, deps: [session] }
  );

  const {
    data: newUserMatchId,
    isLoading: isLoadingUpdateJoinMatch,
    fetchData: triggerSaveUserMatch,
  } = useAsyncData(
    async (body) => {
      const response = await saveUserMatch(body, session?.apiToken);
      return response;
    },
    { autoFetch: false }
  );

  const onClickRow = async (matchId) => {
    setShowDetails(true);
    nprogress.start();
    nprogress.set(50);

    await Promise.all([fetchMatchDetails(matchId), fetchPlayerList(matchId)]);

    nprogress.complete();
    router.push(`/home/activity#details`);
  };

  const onClickCancelOrJoinMatch = async (userMatchId, matchId) => {
    let statusId;

    if (isUserJoined) {
      statusId = AppConstant.GSTS_CANCEL;
    } else {
      statusId = AppConstant.GSTS_ACTIVE;
    }

    const body = {
      body: {
        userMatchId: userMatchId,
        game: {
          matchId: matchId,
        },
        status: {
          statusId: statusId,
        },
      },
    };

    await triggerSaveUserMatch(body);

    if (!isLoadingUpdateJoinMatch) {
      await fetchPlayerList(matchId);
    }
  };

  const textViewData = [
    { label: "Sport", value: safe(matchDetails?.sport) },
    { label: "Venue", value: safe(matchDetails?.venue) },
    { label: "Created By", value: safe(matchDetails?.createdBy) },
    { label: "Date", value: safe(matchDetails?.date) },
    { label: "Time", value: safe(matchDetails?.time) },
    { label: "Status", value: safe(matchDetails?.statusDesc) },
  ];

  return (
    <div>
      <SmartTitle title="Activity" Icon={IconBallFootball} />
      <SmartTableList
        primaryKey="matchId"
        columnList={columnMatchList}
        dataList={matchList}
        tableType="Details"
        onClickRow={onClickRow}
        rowsPerPage={5}
        isLoading={isLoadingMatchList}
        noDataText="No matches available"
      />
      {showDetails && (
        <div id="details" style={{ minHeight: "82vh" }}>
          <SmartCard
            isLoading={isLoadingMatchDetails || isLoadingPlayerList}
            theme="secondary"
          >
            <Grid gutter="sm" justify="center">
              <Grid.Col
                style={{ justifyItems: "center" }}
                span={{ sm: 12, base: 12, md: 4, lg: 3 }}
              >
                <SmartRingProgress
                  progressLabel={`${
                    playerList?.filter(
                      (p) => p.status.statusId === AppConstant.GSTS_ACTIVE
                    ).length ?? 0
                  }/${matchDetails?.maxPlayer ?? 0}`}
                  nameLabel="Player"
                  currentValue={
                    playerList?.filter(
                      (p) => p.status.statusId === AppConstant.GSTS_ACTIVE
                    ).length ?? 0
                  }
                  totalValue={matchDetails?.maxPlayer ?? 0}
                />
              </Grid.Col>

              <Grid.Col
                style={{ alignContent: "center" }}
                span={{ sm: 12, base: 12, md: 8, lg: 9 }}
              >
                <SmartTextView data={textViewData} ellipsis={true} />
              </Grid.Col>
            </Grid>
          </SmartCard>
          <SmartCard
            theme="secondary"
            isLoading={isLoadingMatchDetails || isLoadingPlayerList}
          >
            <SmartTextView
              data={[{ label: "Address", value: matchDetails?.address ?? "-" }]}
              nowrap={false}
              columns={1}
            />
          </SmartCard>
          <SmartTableList
            primaryKey="userMatchId"
            columnList={columnPlayerList}
            dataList={playerList}
            tableType="Default"
            rowsPerPage={5}
            isLoading={isLoadingMatchDetails || isLoadingPlayerList}
            noDataText="No players join yet..."
          />
          {!isLoadingMatchDetails && !isLoadingPlayerList && (
            <div style={{ textAlign: "right" }}>
              <SmartButton
                text={isUserJoined ? "Cancel Join" : "Join"}
                buttonType={isUserJoined ? "cancel" : "submit"}
                icon={
                  isUserJoined ? (
                    <IconX size={14} />
                  ) : (
                    <IconArrowRight size={14} />
                  )
                }
                submitHandler={() =>
                  onClickCancelOrJoinMatch(
                    joinedUserMatchId,
                    matchDetails.matchId
                  )
                }
                loading={isLoadingUpdateJoinMatch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
