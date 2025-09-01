import { useEffect, useState } from "react";
import SmartSelectInput from "../../smart/selectInput/smartSelectInput";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import SmartTextInput from "../../smart/textInput/smart-TextInput";
import { IconAbc, IconClearAll, IconSearch } from "@tabler/icons-react";
import SmartDatePicker from "../../smart/datePicker/smartDatePicker";
import SmartButton from "../../smart/button/smartButton";
import SmartCard from "../../smart/card/smartCard";
import { Grid } from "@mantine/core";
import SmartTimePicker from "../../smart/timePicker/smartTimePicker";

export default function SearchMatchForm({
  sportList,
  statusList,
  request,
  setShowDetails,
}) {
  const [form, setForm] = useState({
    sportId: "",
    venue: "",
    date: "",
    time: "",
    statusId: AppConstant.GSTS_ACTIVE,
    createdById: "",
  });

  const [errors, setErrors] = useState({
    sportId: "",
    venue: "",
    date: "",
    time: "",
    statusId: "",
    createdById: "",
  });

  // separate loading states
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);

  const inputHandler = ({ controlName, value }) => {
    setForm({
      ...form,
      [controlName]: value ?? "",
    });
  };

  const searchHandler = async (formData) => {
    setShowDetails(false);
    return await request(formData);
  };

  useEffect(() => {
    searchHandler(form);
  }, []);

  return (
    <SmartCard>
      <Grid gutter="sm" justify="center">
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
            valueValidator={() => {}}
          />
          <SmartSelectInput
            controlName="statusId"
            label="Status"
            options={statusList}
            value={form.statusId}
            onChange={inputHandler}
            error={errors.statusId}
            style={{ marginBottom: "1rem" }}
            valueValidator={() => {}}
          />
          <SmartTextInput
            controlName="venue"
            label="Venue"
            placeholder="Enter venue"
            type="text"
            contain="icon"
            icon={<IconAbc size={18} stroke={1.5} />}
            align="right"
            error={errors.venue}
            value={form.venue}
            onChange={inputHandler}
            style={{ marginBottom: "1rem" }}
            valueValidator={() => {}}
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
          <SmartDatePicker
            controlName="date"
            placeholder="Select date"
            label="Date"
            value={form.date}
            onChange={inputHandler}
            error={errors.date}
            style={{ marginBottom: "1rem" }}
          />
          <SmartTimePicker
            controlName="time"
            label="Time"
            value={form.time}
            onChange={inputHandler}
            error={errors.time}
            style={{ marginBottom: "1rem" }}
            withDropdown
          />
        </Grid.Col>
        <Grid.Col
          style={{
            justifyItems: "stretch",
            textAlign: "right",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 12, lg: 12 }}
        >
          <SmartButton
            text="Clear"
            style={{
              backgroundColor: "var(--mantine-color-red-5)",
              margin: "0 6px",
            }}
            icon={<IconClearAll size={14} />}
            loading={loadingClear}
            submitHandler={async () => {
              setLoadingClear(true);
              const nextForm = {
                sportId: "",
                venue: "",
                date: "",
                time: "",
                statusId: AppConstant.GSTS_ACTIVE,
                createdById: "",
              };
              setForm(nextForm);
              await searchHandler(nextForm);
              setLoadingClear(false);
            }}
          />
          <SmartButton
            text="Search"
            style={{
              backgroundColor: "var(--mantine-color-blue-6)",
              margin: "0 6px",
            }}
            icon={<IconSearch size={14} />}
            loading={loadingSearch}
            submitHandler={async () => {
              setLoadingSearch(true);
              await searchHandler(form);
              setLoadingSearch(false);
            }}
          />
        </Grid.Col>
      </Grid>
    </SmartCard>
  );
}
