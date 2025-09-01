import { TimePicker } from "@mantine/dates";

export default function SmartTimePicker({
  controlName = "",
  label,
  value,
  onChange,
  type,
  minTime,
  maxTime,
  format = "12h",
  withSeconds = false,
  withDropdown = true,
  withAsterisk = false,
  style,
}) {
  return (
    <TimePicker
      name={controlName}
      label={label}
      value={value}
      onChange={(event) => {
        onChange({ controlName, value: event });
      }}
      type={type}
      min={minTime}
      max={maxTime}
      format={format}
      withSeconds={withSeconds}
      withDropdown={withDropdown}
      withAsterisk={withAsterisk}
      style={style}
    />
  );
}
