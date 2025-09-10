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
  required = false,
  valueValidator,
  error,
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
      withAsterisk={required}
      rightSection={!value ? <IconClock size={18} stroke={1.5} /> : null}
      style={{ minHeight: "80.2px", ...style }}
      error={error}
      onBlur={valueValidator}
    />
  );
}
