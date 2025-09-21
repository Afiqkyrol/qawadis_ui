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
  IconEdit,
  IconMapPin,
  IconPlayFootball,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import {
  Box,
  Divider,
  Grid,
  Group,
  Progress,
  Space,
  Text,
  Title,
} from "@mantine/core";
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
import SmartProgress from "@/app/lib/component/smart/progress/smartProgress";

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
        createdByUserId: response.createdBy.userId,
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
    { interval: 5000, autoFetch: true, noLoading: true, deps: [session] }
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

  const actionJoinCancelButton =
    !isLoadingMatchDetails &&
    !isLoadingPlayerList &&
    matchDetails.status.statusId === AppConstant.GSTS_ACTIVE ? (
      <SmartButton
        text={isUserJoined ? "Cancel Join" : "Join"}
        buttonType={isUserJoined ? "cancel" : "default"}
        variant={isUserJoined ? "outline" : "filled"}
        icon={isUserJoined ? <IconX size={14} /> : <IconArrowRight size={14} />}
        submitHandler={openModal}
        loading={isLoadingUpdateJoinMatch}
      />
    ) : (
      <></>
    );

  const viewData = [
    {
      label: "Venue",
      value: safe(matchDetails?.venue),
      isValueText: true,
      icon: <IconMapPin />,
      iconColor: "red",
      span: { base: 12, md: 4, lg: 3 },
    },
    {
      label: "Date",
      value: safe(matchDetails?.date),
      isValueText: true,
      icon: <IconCalendar />,
      iconColor: "green",
      span: { base: 12, md: 4, lg: 3 },
    },
    {
      label: "Time",
      value: safe(matchDetails?.time),
      isValueText: true,
      icon: <IconClock />,
      iconColor: "orange",
      span: { base: 12, md: 4, lg: 3 },
    },
    {
      label: "Maximum Player",
      value: safe(matchDetails?.maxPlayer) + " Player(s)",
      isValueText: true,
      icon: <IconPlayFootball />,
      iconColor: "violet",
      span: { base: 12, md: 4, lg: 3 },
    },
  ];
  ``;
  const playerListViewData = [
    {
      label:
        "Total Players Joined : " +
        playerList?.filter((p) => p.status.statusId === AppConstant.GSTS_ACTIVE)
          .length +
        "/" +
        safe(matchDetails?.maxPlayer),
      value: (
        <SmartProgress
          currentValue={
            playerList?.filter(
              (p) => p.status.statusId === AppConstant.GSTS_ACTIVE
            ).length
          }
          totalValue={safe(matchDetails?.maxPlayer)}
        />
      ),
      isValueText: false,
      icon: <IconPlayFootball />,
      iconColor: "violet",
      span: { base: 12, md: 12, lg: 12 },
    },
  ];

  const activeStatusPlayerTab = () => {
    return (
      <>
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
          footerContent={actionJoinCancelButton}
        />
      </>
    );
  };

  const canceledStatusPlayerTab = () => {
    return (
      <>
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
          footerContent={actionJoinCancelButton}
        />
      </>
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

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <>
      <SmartTitle title="Activity Details" Icon={IconBallFootball} />
      <SmartBreadcrumbs itemList={items} />
      <Divider my="xs" label="Details" labelPosition="center" />
      <SmartHeader
        isLoading={isLoadingMatchDetails}
        title="Football"
        description={
          <>
            Created by <strong>{matchDetails?.createdBy}</strong>
          </>
        }
        status={matchDetails?.statusDesc}
        data={<SmartDataDisplay data={viewData} />}
      />
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          {matchDetails?.remark && (
            <SmartCard isLoading={isLoadingMatchDetails} smallSkeleton={true}>
              <Title order={3} mb="sm">
                Description
              </Title>
              <Text size="md">{matchDetails?.remark}</Text>
            </SmartCard>
          )}
          <SmartCard isLoading={isLoadingPlayerList} smallSkeleton={true}>
            <SmartDataDisplay data={playerListViewData} />
          </SmartCard>
          <SmartTab
            tabs={tabs}
            defaultValue="active"
            isLoading={isLoadingMatchDetails}
          />
        </Grid.Col>
        <Grid.Col span={12} hiddenFrom={"md"}>
          <Divider />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <SmartCard isLoading={isLoadingMatchDetails}>
            <Title order={3} mb="sm">
              Location
            </Title>
            <Text size="md" fw={600}>
              {matchDetails?.venue}
            </Text>
            <Text size="md" c="dimmed" mb={"sm"}>
              {matchDetails?.address}
            </Text>
            {matchDetails?.mapEmbedLink && (
              <>
                <SmartMapEmbed shareUrl={matchDetails.mapEmbedLink} />
                <SmartButton
                  variant="light"
                  text="View on Map"
                  submitHandler={() => {
                    window.open(matchDetails.mapShortLink, "_blank");
                  }}
                  icon={<IconMapPin />}
                />
              </>
            )}
          </SmartCard>
          {session?.user?.userId === matchDetails?.createdByUserId && (
            <SmartCard isLoading={isLoadingMatchDetails}>
              <Title order={3} mb="sm">
                Action
              </Title>
              <SmartButton
                variant="light"
                text="Edit"
                submitHandler={() => {}}
                icon={<IconEdit />}
              />
              <Space h="xs" />
              <SmartButton
                variant="light"
                text="Delete"
                buttonType="cancel"
                submitHandler={() => {}}
                icon={<IconTrash />}
              />
            </SmartCard>
          )}
        </Grid.Col>
      </Grid>
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
