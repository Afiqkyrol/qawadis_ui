"use client";

import { useSession } from "@/app/lib/component/layout/innerLayout";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import {
  findMatchById,
  getPlayerListByMatchId,
  saveUserMatch,
} from "../activity.service";
import { DataFormatter } from "@/app/lib/util/dataFormatter";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useEffect, useState } from "react";
import { nprogress } from "@mantine/nprogress";
import SmartBreadcrumbs from "@/app/lib/component/smart/breadCrumbs/smartBreadCrumbs";
import SmartTitle from "@/app/lib/component/smart/title/smartTitle";
import {
  IconArrowRight,
  IconBallFootball,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconPlayFootball,
  IconX,
} from "@tabler/icons-react";
import { Divider, Grid } from "@mantine/core";
import SmartStatusBadge from "@/app/lib/component/smart/smartStatusBadge/smartStatusBadge";
import SmartTableList from "@/app/lib/component/smart/tableList/smartTableList";
import SmartButton from "@/app/lib/component/smart/button/smartButton";
import SmartTab from "@/app/lib/component/smart/tab/smartTab";
import SmartTextView from "@/app/lib/component/smart/textView/smartTextView";
import SmartMapEmbed from "@/app/lib/component/smart/mapEmbed/smartMapEmbed";
import SmartDataDisplay from "@/app/lib/component/smart/dataDisplay/smartDataDisplay";
import SmartHeader from "@/app/lib/component/smart/header/smartHeader";
import SmartModal from "@/app/lib/component/smart/modal/smartModal";
import { useDisclosure } from "@mantine/hooks";
import SmartCard from "@/app/lib/component/smart/card/smartCard";
import SmartRingProgress from "@/app/lib/component/smart/ringProgress/smartRingProgress";

const safe = (val) => val ?? "-";

const columnActivePlayerList = [
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

const columnCanceledPlayerList = [
  {
    field: "player",
    name: "Player",
    icon: IconPlayFootball,
    iconColor: "violet",
  },
  {
    field: "createdAt",
    name: "Canceled at",
    icon: IconCalendar,
    iconColor: "green",
  },
  {
    field: "statusDesc",
    name: "Status",
  },
];

export default function DetailsActivityClient({ matchId }) {
  const items = [
    { title: "Activity", href: "/home/activity" },
    { title: "Details", href: `/home/activity/${matchId}` },
  ];
  const session = useSession();
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [joinedUserMatchId, setJoinedUserMatchId] = useState(null);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const {
    data: matchDetails,
    isLoading: isLoadingMatchDetails,
    request: fetchMatchDetails,
  } = useAsyncData(
    async () => {
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
    { autoFetch: true, deps: [session] }
  );

  const {
    data: playerList,
    isLoading: isLoadingPlayerList,
    request: fetchPlayerList,
  } = useAsyncData(
    async () => {
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
        createdAt: DataFormatter.formatDateTime(
          userMatch.maintainAt ? userMatch.maintainAt : userMatch.createdAt
        ),
      }));
    },
    { interval: 5000, autoFetch: true, deps: [session] }
  );

  const {
    data: newUserMatchId,
    isLoading: isLoadingUpdateJoinMatch,
    request: triggerSaveUserMatch,
  } = useAsyncData(
    async (body) => {
      const response = await saveUserMatch(body, session?.apiToken);
      return response;
    },
    { autoFetch: false }
  );

  const onClickCancelOrJoinMatch = async (userMatchId, matchId) => {
    let statusId;

    if (isUserJoined) {
      statusId = AppConstant.GSTS_CANCELED;
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

  const activeStatusPlayerTab = () => {
    return (
      <SmartTableList
        primaryKey="userMatchId"
        columnList={columnActivePlayerList}
        dataList={playerList.filter(
          (p) => p.status.statusId === AppConstant.GSTS_ACTIVE
        )}
        tableType="Default"
        rowsPerPage={5}
        isLoading={isLoadingMatchDetails || isLoadingPlayerList}
        noDataText="No players join yet..."
      />
    );
  };

  const canceledStatusPlayerTab = () => {
    return (
      <SmartTableList
        primaryKey="userMatchId"
        columnList={columnCanceledPlayerList}
        dataList={playerList.filter(
          (p) => p.status.statusId === AppConstant.GSTS_CANCELED
        )}
        tableType="Default"
        rowsPerPage={5}
        isLoading={isLoadingMatchDetails || isLoadingPlayerList}
        noDataText="No Canceled Players"
      />
    );
  };

  const tabs = [
    {
      value: "active",
      label: <SmartStatusBadge value="ACTIVE" cursor="pointer" />,
      content: activeStatusPlayerTab(),
    },
    {
      value: "cancel",
      label: <SmartStatusBadge value="CANCELED" cursor="pointer" />,
      content: canceledStatusPlayerTab(),
    },
  ];

  const textViewData = [
    { label: "Sport", value: safe(matchDetails?.sport) },
    { label: "Venue", value: safe(matchDetails?.venue) },
    { label: "Created By", value: safe(matchDetails?.createdBy) },
    { label: "Date", value: safe(matchDetails?.date) },
    { label: "Time", value: safe(matchDetails?.time) },
    { label: "Status", value: safe(matchDetails?.statusDesc) },
  ];

  const textViewData2 = [
    {
      label: "Venue",
      value: safe(matchDetails?.venue),
      icon: <IconMapPin />,
      iconColor: "red",
      span: { base: 12, md: 4, lg: 3 },
    },
    {
      label: "Date",
      value: safe(matchDetails?.date),
      icon: <IconCalendar />,
      iconColor: "green",
      span: { base: 12, md: 4, lg: 3 },
    },
    {
      label: "Time",
      value: safe(matchDetails?.time),
      icon: <IconClock />,
      iconColor: "orange",
      span: { base: 12, md: 4, lg: 3 },
    },
  ];

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <>
      <SmartTitle title="Activity Details" Icon={IconBallFootball} />
      <SmartBreadcrumbs itemList={items} />
      <Divider my="xs" label="Details" labelPosition="center" />
      <SmartHeader
        title="Football"
        description={
          <>
            Created by <b>Admin</b>
          </>
        }
        status={matchDetails?.statusDesc}
        data={<SmartDataDisplay data={textViewData2} />}
      />
      <SmartCard isLoading={isLoadingMatchDetails} theme="secondary">
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
        isLoading={isLoadingMatchDetails}
        smallSkeleton={true}
      >
        {matchDetails?.mapLink && (
          <SmartMapEmbed shareUrl={matchDetails.mapLink} />
        )}
        <SmartTextView
          data={[{ label: "Address", value: matchDetails?.address ?? "-" }]}
          nowrap={false}
          columns={1}
        />
      </SmartCard>
      <SmartTab
        tabs={tabs}
        defaultValue="active"
        isLoading={isLoadingMatchDetails || isLoadingPlayerList}
      />
      {!isLoadingMatchDetails &&
        !isLoadingPlayerList &&
        matchDetails.status.statusId === AppConstant.GSTS_ACTIVE && (
          <div style={{ textAlign: "right" }}>
            <SmartButton
              text={isUserJoined ? "Cancel Join" : "Join"}
              buttonType={isUserJoined ? "cancel" : "default"}
              icon={
                isUserJoined ? (
                  <IconX size={14} />
                ) : (
                  <IconArrowRight size={14} />
                )
              }
              submitHandler={openModal}
              loading={isLoadingUpdateJoinMatch}
            />
          </div>
        )}
      <SmartModal
        isOpen={openedModal}
        onClose={closeModal}
        type="confirmation"
        title="Confirmation"
        description="Are you sure you want to proceed?"
        actionButtonColor={
          isUserJoined ? "var(--mantine-color-red-5)" : undefined
        }
        confirmAction={() => {
          onClickCancelOrJoinMatch(joinedUserMatchId, matchDetails.matchId);
          closeModal();
        }}
      />
    </>
  );
}
