import { NumberInput } from "@mantine/core";
import { Icon123 } from "@tabler/icons-react";
import "./smartNumberInput.css";

export default function SmartNumberInput({
  controlName,
  label,
  placeholder,
  error,
  required,
  value,
  min = 0,
  max,
  onChange,
  valueValidator,
  style,
}) {
  return (
    <NumberInput
      name={controlName}
      label={label}
      placeholder={placeholder}
      withAsterisk={required}
      error={error}
      style={style}
      value={value}
      min={min}
      max={max}
      //   rightSection={<Icon123 size={18} stroke={1.5} />}
      onChange={(event) => {
        onChange({
          controlName: controlName,
          value: event,
        });
      }}
      onBlur={valueValidator}
    />
  );
}
