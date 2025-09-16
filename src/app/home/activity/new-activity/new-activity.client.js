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
import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useNavigate } from "@/app/lib/hook/useNavigate";

const items = [
  { title: "Activity", href: "/home/activity" },
  { title: "New Activity", href: "/home/activity/new-activity" },
];

export default function NewActivityClientPage() {
  const session = useSession();
  const isVertical = useMediaQuery("(max-width: 48em)"); // 48em = 768px (Mantine base breakpoint)
  const { goTo } = useNavigate();

  const [form, setForm] = useState({
    matchId: "",
    sportId: "",
    date: "",
    time: "",
    maxPlayer: "",
    remark: "",
    withMapsLink: false,
    mapLink: "",
    rawMapLink: "",
    venue: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    sportId: "",
    date: "",
    time: "",
    maxPlayer: "",
    remark: "",
    rawMapLink: "",
    venue: "",
    address: "",
  });

  function validateField(controlName, value) {
    let error = "";

    if (controlName === "sportId") {
      if (!value) error = "Sport is required";
    }

    if (controlName === "date") {
      if (!value) error = "Date is required";
    }

    if (controlName === "maxPlayer") {
      if (!value || value < 1) error = "Max player required at least 1";
    }

    if (controlName === "time") {
      if (!value) error = "Time is required";
    }

    if (controlName === "venue") {
      if (!value) error = "Venue is required";
    }

    if (controlName === "address") {
      if (!value) error = "Address is required";
    }

    if (controlName === "rawMapLink" && form.withMapsLink) {
      if (!value) error = "Google Maps Link is required";
    }

    if (controlName === "mapLink" && form.withMapsLink) {
      controlName = "rawMapLink";
      if (!form.rawMapLink) error = "Google Maps Link is required";
      else if (!value)
        error =
          "Please click the Map Button on the right first to check the map";
    }

    setErrors((prev) => ({ ...prev, [controlName]: error }));
    return error === "";
  }

  const isMatchDetailsFormValid = () => {
    return (
      validateField("sportId", form.sportId) &&
      validateField("date", form.date) &&
      validateField("maxPlayer", form.maxPlayer) &&
      validateField("time", form.time)
    );
  };

  const isLocationFormValid = () => {
    return (
      validateField("venue", form.venue) &&
      validateField("address", form.address) &&
      validateField("rawMapLink", form.rawMapLink) &&
      validateField("mapLink", form.mapLink)
    );
  };

  const {
    data: newMatchId,
    isLoading: isLoadingMatch,
    request: triggerSaveMatch,
  } = useAsyncData(
    async () => {
      const body = {
        matchId: form.matchId,
        sport: {
          sportId: form.sportId,
        },
        venue: form.venue,
        address: form.address,
        maxPlayer: form.maxPlayer,
        date: form.date,
        time: form.time,
        mapLink: form.mapLink,
        remark: form.remark,
        status: {
          statusId: AppConstant.GSTS_ACTIVE,
        },
      };
      const response = await saveMatch({ body }, session?.apiToken);
      return response;
    },
    { autoFetch: false }
  );

  const submitHandler = async () => {
    try {
      await triggerSaveMatch();
      goTo("/home/activity");
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    nprogress.complete();
  }, []);

  const matchDetailsStep = () => (
    <MatchDetailsForm
      form={form}
      setForm={setForm}
      errors={errors}
      validateField={validateField}
    />
  );

  const locationDetailsStep = () => (
    <LocationDetailsForm
      form={form}
      setForm={setForm}
      errors={errors}
      setErrors={setErrors}
      validateField={validateField}
    />
  );

  const confirmationStep = () => (
    <>
      <MatchDetailsForm
        form={form}
        setForm={setForm}
        errors={errors}
        validateField={validateField}
        readOnly={true}
      />
      <LocationDetailsForm
        form={form}
        setForm={setForm}
        errors={errors}
        setErrors={setErrors}
        validateField={validateField}
        readOnly={true}
      />
    </>
  );

  const stepList = [
    {
      label: "First step",
      description: "Activity Details",
      content: matchDetailsStep(),
      validation: () => isMatchDetailsFormValid(),
    },
    {
      label: "Second step",
      description: "Location details",
      content: locationDetailsStep(),
      validation: () => isLocationFormValid(),
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
      <Divider my="xs" label="Create Activity" labelPosition="center" />
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
