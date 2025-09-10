"use client";

import { AppConstant } from "@/app/lib/constant/AppConstant";
import { useLookupData } from "@/app/lib/hook/useLookupData";
import { useSession } from "../../layout/innerLayout";
import { Grid } from "@mantine/core";
import { useState } from "react";
import SmartSelectInput from "../../smart/selectInput/smartSelectInput";
import SmartDatePicker from "../../smart/datePicker/smartDatePicker";
import SmartNumberInput from "../../smart/numberInput/smartNumberInput";
import SmartTimePicker from "../../smart/timePicker/smartTimePicker";
import SmartTextInput from "../../smart/textInput/smart-TextInput";

export default function MatchDetailsForm({ form, setForm }) {
  const session = useSession();

  const [errors, setErrors] = useState({
    sportId: "",
    date: "",
    time: "",
    maxPlayer: "",
    remark: "",
  });

  const inputHandler = ({ controlName, value }) => {
    setForm({
      ...form,
      [controlName]: value ?? "",
    });

    validateField(controlName, value);
  };

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

    setErrors((prev) => ({ ...prev, [controlName]: error }));
    return error === "";
  }

  const { data: sportList, isLoading: loadingSportList } = useLookupData(
    AppConstant.LT_SPORT_TABLE,
    session?.apiToken
  );
  const { data: statusList, isLoading: loadingStatusList } = useLookupData(
    AppConstant.LT_GENERAL_STATUS_TABLE,
    session?.apiToken
  );

  return (
    <>
      <Grid style={{ marginTop: "2rem" }} gutter="sm" justify="center">
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 6, lg: 6 }}
        >
          <SmartSelectInput
            controlName="sportId"
            label="Sport"
            options={sportList}
            value={form.sportId}
            onChange={inputHandler}
            error={errors.sportId}
            style={{ marginBottom: "1rem" }}
            required={true}
            valueValidator={() => validateField("sportId", form.sportId)}
          />
          <SmartDatePicker
            controlName="date"
            placeholder="Select date"
            label="Date"
            value={form.date}
            minDate={new Date()}
            onChange={inputHandler}
            error={errors.date}
            required={true}
            style={{ marginBottom: "1rem" }}
            valueValidator={() => validateField("date", form.date)}
          />
        </Grid.Col>
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 6, lg: 6 }}
        >
          <SmartNumberInput
            controlName="maxPlayer"
            placeholder="Enter maximum players allowed"
            label="Max Player(s)"
            value={form.maxPlayer}
            onChange={inputHandler}
            error={errors.maxPlayer}
            required={true}
            style={{ marginBottom: "1rem" }}
            valueValidator={() => validateField("maxPlayer", form.maxPlayer)}
          />
          <SmartTimePicker
            controlName="time"
            label="Time"
            value={form.time}
            onChange={inputHandler}
            error={errors.time}
            style={{ marginBottom: "1rem" }}
            valueValidator={() => validateField("time", form.time)}
            required={true}
            withDropdown
          />
        </Grid.Col>
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 12, lg: 12 }}
        >
          <SmartTextInput
            controlName="remark"
            label="Remark"
            placeholder="Enter remark"
            type="textarea"
            value={form.remark}
            error={errors.remark}
            onChange={inputHandler}
            style={{ marginBottom: "2rem" }}
            valueValidator={() => validateField("remark", form.remark)}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
