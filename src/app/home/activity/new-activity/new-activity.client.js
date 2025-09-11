"use client";

import SmartBreadcrumbs from "@/app/lib/component/smart/breadCrumbs/smartBreadCrumbs";
import SmartCard from "@/app/lib/component/smart/card/smartCard";
import SmartStepper from "@/app/lib/component/smart/stepper/smartStepper";
import SmartTitle from "@/app/lib/component/smart/title/smartTitle";
import { Divider } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import MatchDetailsForm from "@/app/lib/component/form/new-activity/matchDetailsForm";
import { saveMatch } from "./new-activity.service";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import { useSession } from "@/app/lib/component/layout/innerLayout";
import LocationDetailsForm from "@/app/lib/component/form/new-activity/locationDetailsForm";

const items = [
  { title: "Activity", href: "/home/activity" },
  { title: "New Activity", href: "/home/activity/new-activity" },
];

export default function NewActivityClientPage() {
  const session = useSession();
  const isVertical = useMediaQuery("(max-width: 48em)"); // 48em = 768px (Mantine base breakpoint)

  const [form, setForm] = useState({
    sportId: "",
    date: "",
    time: "",
    maxPlayer: "",
    remark: "",
    mapLink: "",
    venue: "",
    address: "",
  });

  const {
    data: newMatchId,
    isLoading: isLoadingMatch,
    request: triggerSaveMatch,
  } = useAsyncData(
    async () => {
      const response = await saveMatch(form, session?.apiToken);
      return response;
    },
    { autoFetch: false }
  );

  const submitHandler = async () => {
    try {
      await triggerSaveMatch();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    nprogress.complete();
  }, []);

  const matchDetailsStep = () => (
    <MatchDetailsForm form={form} setForm={setForm} />
  );

  const locationDetailsStep = () => (
    <LocationDetailsForm form={form} setForm={setForm} />
  );

  const confirmationStep = () => (
    <>
      <h3>Confirmation</h3>
      {/* Form fields go here */}
    </>
  );

  const stepList = [
    {
      label: "First step",
      description: "Match Details",
      content: matchDetailsStep(),
    },
    {
      label: "Second step",
      description: "Location details",
      content: locationDetailsStep(),
    },
    {
      label: "Final step",
      description: "Confirm and Create",
      content: confirmationStep(),
    },
  ];

  return (
    <>
      <SmartTitle title="New Activity" Icon={IconPlus} />
      <SmartBreadcrumbs itemList={items} />
      <Divider my="xs" label="Create Match" labelPosition="center" />
      <SmartCard>
        <SmartStepper
          submitHandler={submitHandler}
          stepList={stepList}
          orientation={isVertical ? "vertical" : "horizontal"}
        />
      </SmartCard>
    </>
  );
}
