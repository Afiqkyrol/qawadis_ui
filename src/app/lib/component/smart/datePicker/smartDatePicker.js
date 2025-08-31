import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function SmartDatePicker({
  controlName = "",
  label,
  placeholder,
  value,
  onChange,
  type,
  minDate,
  maxDate,
  valueFormat = "DD MMM YYYY",
  clearable = true,
  disabled = false,
  withAsterisk = false,
  allowDeselect = false,
  style,
}) {
  return (
    <DatePickerInput
      name={controlName}
      label={label}
      placeholder={placeholder}
      value={value && !isNaN(new Date(value)) ? new Date(value) : null}
      onChange={(date) => {
        const formatted = date ? dayjs(date).format("YYYY-MM-DD") : "";
        onChange({ controlName, value: formatted });
      }}
      type={type}
      minDate={minDate}
      maxDate={maxDate}
      valueFormat={valueFormat}
      clearable={clearable}
      allowDeselect={allowDeselect}
      disabled={disabled}
      withAsterisk={withAsterisk}
      rightSection={!value ? <IconCalendar size={18} stroke={1.5} /> : null}
      style={style}
    />
  );
}
