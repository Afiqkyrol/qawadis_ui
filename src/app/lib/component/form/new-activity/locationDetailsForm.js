import { ActionIcon, Grid } from "@mantine/core";
import { useState } from "react";
import SmartTextInput from "../../smart/textInput/smart-TextInput";
import { IconMapDown } from "@tabler/icons-react";
import SmartMapEmbed from "../../smart/mapEmbed/smartMapEmbed";
import { DataFormatter } from "@/app/lib/util/dataFormatter";
import SmartSwitchInput from "../../smart/switchInput/smartSwitchInput";

export default function LocationDetailsForm({
  form,
  setForm,
  errors,
  setErrors,
  validateField,
  readOnly = false,
}) {
  const [isMapLoading, setIsMapLoading] = useState(false);
  const inputHandler = ({ controlName, value }) => {
    if (controlName === "rawMapLink") {
      setForm({
        ...form,
        [controlName]: value ?? "",
        mapLink: "",
      });
    } else if (controlName === "withMapsLink") {
      setForm({
        ...form,
        rawMapLink: "",
        mapLink: "",
        [controlName]: value ?? "",
      });
    } else {
      setForm({
        ...form,
        [controlName]: value ?? "",
      });
    }

    validateField(controlName, value);
  };

  const buttonCheckMapHandler = async () => {
    try {
      setIsMapLoading(true);
      const embedUrl = await DataFormatter.googleMapsLinkToEmbedLinks(
        form.rawMapLink
      );

      setForm({
        ...form,
        mapLink: embedUrl,
      });

      validateField("mapLink", embedUrl);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        rawMapLink: "Please enter a valid Google Maps Link",
      }));
      setForm({
        ...form,
        mapLink: "",
      });
    } finally {
      setIsMapLoading(false);
    }
  };

  return (
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
          placeholder="Enter Venue"
          value={form.venue}
          required={true}
          readOnly={readOnly}
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
          placeholder="Enter Address"
          required={true}
          value={form.address}
          error={errors.address}
          readOnly={readOnly}
          onChange={inputHandler}
          valueValidator={() => validateField("address", form.address)}
        />
      </Grid.Col>
      <Grid.Col
        style={{
          justifyItems: "stretch",
          paddingTop: "0",
          paddingBottom: "0",
          marginBottom: "1rem",
        }}
        span={{ sm: 12, base: 12, md: 12, lg: 12 }}
      >
        <SmartSwitchInput
          controlName="withMapsLink"
          label="Include Google Maps Link"
          value={form.withMapsLink}
          onChange={inputHandler}
          readOnly={readOnly}
          style={{ width: "max-content" }}
        />
      </Grid.Col>
      {form.withMapsLink == true && (
        <Grid.Col
          style={{
            justifyItems: "stretch",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          span={{ sm: 12, base: 12, md: 12, lg: 12 }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1%",
            }}
          >
            <SmartTextInput
              controlName="rawMapLink"
              label="Google Maps Link"
              placeholder="Enter Link"
              value={form.rawMapLink}
              error={errors.rawMapLink}
              required={true}
              readOnly={readOnly}
              onChange={inputHandler}
              valueValidator={() => {}}
              style={{ width: "inherit" }}
            />
            <ActionIcon
              style={{ maxWidth: "34px", marginTop: "6px" }}
              variant="outline"
              size="input-sm"
              disabled={readOnly}
              loading={isMapLoading}
              onClick={async () => {
                buttonCheckMapHandler();
              }}
            >
              <IconMapDown size={18} stroke={1.5} />
            </ActionIcon>
          </div>
        </Grid.Col>
      )}
      {form?.mapLink && (
        <SmartMapEmbed shareUrl={form.mapLink} isLoading={isMapLoading} />
      )}
    </Grid>
  );
}
