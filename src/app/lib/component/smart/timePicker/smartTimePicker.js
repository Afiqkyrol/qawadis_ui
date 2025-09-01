import { TimePicker } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

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
  clearable = true,
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
      clearable
      withSeconds={withSeconds}
      withDropdown={withDropdown}
      withAsterisk={withAsterisk}
      rightSection={!value ? <IconClock size={18} stroke={1.5} /> : null}
      style={style}
    />
  );
}
