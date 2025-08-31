import { NativeSelect } from "@mantine/core";

export default function SmartSelectInput({
  controlName,
  label,
  options = [],
  value,
  onChange,
  required,
  readOnly,
  error,
  style,
  valueValidator,
}) {
  const normalizedOptions =
    options.length > 0
      ? options[0]?.value === ""
        ? options
        : [{ label: "Select...", value: "" }, ...options]
      : [{ label: "Select...", value: "" }];

  return (
    <NativeSelect
      name={controlName}
      label={label}
      withAsterisk={required}
      value={value}
      data={normalizedOptions}
      disabled={readOnly}
      error={error}
      style={style}
      onChange={(event) =>
        onChange({ controlName, value: event.currentTarget.value })
      }
      onBlur={valueValidator}
    />
  );
}
