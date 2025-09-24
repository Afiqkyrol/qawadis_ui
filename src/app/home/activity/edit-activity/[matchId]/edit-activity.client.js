"use client";

import { useSession } from "@/app/lib/component/layout/innerLayout";
import SmartBreadcrumbs from "@/app/lib/component/smart/breadCrumbs/smartBreadCrumbs";
import SmartTitle from "@/app/lib/component/smart/title/smartTitle";
import { useAsyncData } from "@/app/lib/hook/useAsyncData";
import { useNavigate } from "@/app/lib/hook/useNavigate";
import { Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { findMatchById, saveMatch } from "../../activity.service";
import MatchDetailsForm from "@/app/lib/component/form/new-activity/matchDetailsForm";
import LocationDetailsForm from "@/app/lib/component/form/new-activity/locationDetailsForm";
import SmartCard from "@/app/lib/component/smart/card/smartCard";
import SmartStepper from "@/app/lib/component/smart/stepper/smartStepper";
import { DataFormatter } from "@/app/lib/util/dataFormatter";
import { AppConstant } from "@/app/lib/constant/AppConstant";

export default function EditActivityClient({ matchId }) {
  const items = [
    { title: "Activity", href: "/home/activity" },
    { title: "Edit", href: `/home/activity/edit-activity/${matchId}` },
  ];

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
    mapEmbedLink: "",
    mapShareLink: "",
    venue: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    sportId: "",
    date: "",
    time: "",
    maxPlayer: "",
    remark: "",
    mapShareLink: "",
    venue: "",
    address: "",
  });

  const {
    data: matchDetails,
    isLoading: isLoadingMatchDetails,
    request: fetchMatchDetails,
  } = useAsyncData(
    async () => {
      const response = await findMatchById(matchId, true, session?.apiToken);
      if (response === null) {
        goTo("/home/activity");
        notificationError("Data not found", "Match data not found");
        return;
      }

      if (response.status.statusId === AppConstant.GSTS_CANCELED) {
        setStatusColor("red");
      }
      if (response.status.statusId === AppConstant.GSTS_CLOSED) {
        setStatusColor("gray");
      }

      setForm((prev) => ({
        ...prev,
        matchId: response.matchId,
        sportId: response.sport.sportId,
        date: response.date,
        time: response.time,
        maxPlayer: response.maxPlayer,
        remark: response.remark,
        // withMapsLink: response.withMapsLink,
        mapEmbedLink: response.mapEmbedLink,
        mapShareLink: response.mapShareLink,
        venue: response.venue,
        address: response.address,
      }));

      if (response.mapEmbedLink) {
        setForm((prev) => ({ ...prev, withMapsLink: true }));
      }

      return {
        ...response,
        sportDesc: response.sport.description,
        statusDesc: response.status.description,
        formattedDate: DataFormatter.formatDate(response.date),
        formattedTime: DataFormatter.formatTime(response.time),
        createdByUsername: response.createdBy.username,
        createdByUserId: response.createdBy.userId,
      };
    },
    { autoFetch: true, deps: [session] }
  );

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

    if (controlName === "mapShareLink" && form.withMapsLink) {
      if (!value) error = "Google Maps Link is required";
    }

    if (controlName === "mapEmbedLink" && form.withMapsLink) {
      controlName = "mapShareLink";
      if (!form.mapShareLink) error = "Google Maps Link is required";
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
      validateField("mapShareLink", form.mapShareLink) &&
      validateField("mapEmbedLink", form.mapEmbedLink)
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
        mapShareLink: form.mapShareLink,
        mapEmbedLink: form.mapEmbedLink,
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
    const matchId = await triggerSaveMatch();
    goTo(`/home/activity/details-activity/${matchId}`);
  };

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
      description: "Confirm and Save",
      content: confirmationStep(),
    },
  ];

  useEffect(() => {
    nprogress.complete();
  }, []);
  return (
    <>
      <SmartTitle title="Edit Activity" Icon={IconEdit} />
      <SmartBreadcrumbs itemList={items} />
      <Divider my="xs" label="Edit Activity" labelPosition="center" />
      <SmartCard>
        <SmartStepper
          submitHandler={submitHandler}
          stepList={stepList}
          isLoading={isLoadingMatchDetails}
          orientation={isVertical ? "vertical" : "horizontal"}
        />
      </SmartCard>
    </>
  );
}
