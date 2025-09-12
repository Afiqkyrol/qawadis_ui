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
      validateField("address", form.address)
    );
  };

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
      />
      <LocationDetailsForm
        form={form}
        setForm={setForm}
        errors={errors}
        setErrors={setErrors}
        validateField={validateField}
      />
    </>
  );

  const stepList = [
    {
      label: "First step",
      description: "Match Details",
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
