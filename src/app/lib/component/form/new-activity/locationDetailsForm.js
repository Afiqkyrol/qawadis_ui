import { Grid } from "@mantine/core";
import { useState } from "react";
import SmartTextInput from "../../smart/textInput/smart-TextInput";
import { IconCheck } from "@tabler/icons-react";
import SmartButton from "../../smart/button/smartButton";

export default function LocationDetailsForm({ form, setForm }) {
  const [errors, setErrors] = useState({
    venue: "",
    mapLink: "",
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

    // if (controlName === "sportId") {
    //   if (!value) error = "Sport is required";
    // }

    setErrors((prev) => ({ ...prev, [controlName]: error }));
    return error === "";
  }

  return (
    <>
      <Grid
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        gutter="sm"
        justify="center"
      >
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 6, lg: 6 }}
        >
          <SmartTextInput
            controlName="venue"
            label="Venue"
            placeholder="Enter venue"
            value={form.venue}
            required={true}
            error={errors.venue}
            onChange={inputHandler}
            valueValidator={() => validateField("venue", form.venue)}
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
          <SmartTextInput
            controlName="address"
            label="Address"
            placeholder="Enter address"
            required={true}
            value={form.address}
            error={errors.address}
            onChange={inputHandler}
            valueValidator={() => validateField("address", form.address)}
          />
        </Grid.Col>
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 6, base: 12, md: 9, lg: 10 }}
        >
          <SmartTextInput
            controlName="mapLink"
            label="Google Maps Link"
            placeholder="Enter link"
            value={form.mapLink}
            error={errors.mapLink}
            onChange={inputHandler}
            valueValidator={() => validateField("mapLink", form.mapLink)}
          />
        </Grid.Col>
        <Grid.Col
          style={{
            justifyItems: "stretch",
            alignContent: "center",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 6, base: 12, md: 3, lg: 2 }}
        >
          <SmartButton
            text="Check Map"
            variant="outline"
            style={{
              marginTop: "6px",
            }}
            icon={<IconCheck size={14} />}
            // loading={loadingSearch}
            submitHandler={async () => {}}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
