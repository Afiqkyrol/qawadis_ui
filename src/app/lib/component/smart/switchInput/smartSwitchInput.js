import { Switch } from "@mantine/core";
import "./smartSwitchInput.css";

export default function SmartSwitchInput({
  controlName,
  label,
  value,
  onChange,
  style,
  readOnly,
}) {
  return (
    <Switch
      name={controlName}
      label={label}
      disabled={readOnly}
      checked={value}
      style={style}
      onChange={(event) => {
        onChange({
          controlName: event.target.name,
          value: event.currentTarget.checked,
        });
      }}
    />
  );
}
