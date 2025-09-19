import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import "./smartDatePicker.css";

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
  readOnly = false,
  withAsterisk = false,
  allowDeselect = false,
  required,
  style,
  valueValidator,
  error,
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
      disabled={readOnly}
      withAsterisk={required}
      rightSection={!value ? <IconCalendar size={18} stroke={1.5} /> : null}
      style={style}
      onDropdownClose={valueValidator}
      error={error}
    />
  );
}
