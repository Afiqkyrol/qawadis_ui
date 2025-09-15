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

export default function MatchDetailsForm({
  form,
  setForm,
  errors,
  validateField,
  readOnly = false,
}) {
  const session = useSession();

  const inputHandler = ({ controlName, value }) => {
    setForm({
      ...form,
      [controlName]: value ?? "",
    });

    validateField(controlName, value);
  };

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
            readOnly={readOnly}
            error={errors.sportId}
            required={true}
            valueValidator={() => validateField("sportId", form.sportId)}
          />
          <SmartDatePicker
            controlName="date"
            placeholder="Select date"
            label="Date"
            value={form.date}
            minDate={new Date().setDate(new Date().getDate() + 1)}
            onChange={inputHandler}
            readOnly={readOnly}
            error={errors.date}
            required={true}
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
            readOnly={readOnly}
            required={true}
            valueValidator={() => validateField("maxPlayer", form.maxPlayer)}
          />
          <SmartTimePicker
            controlName="time"
            label="Time"
            value={form.time}
            onChange={inputHandler}
            error={errors.time}
            readOnly={readOnly}
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
            readOnly={readOnly}
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
