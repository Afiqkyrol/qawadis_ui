import {
  TextInput,
  Tooltip,
  Text,
  Center,
  PasswordInput,
  Textarea,
} from "@mantine/core";
import "./smart-TextInput.css";

export default function SmartTextInput({
  controlName,
  label,
  placeholder,
  type,
  contain,
  description,
  icon,
  align,
  tooltipLabel,
  error,
  required,
  value,
  onChange,
  valueValidator,
  readOnly,
  style,
}) {
  if (type === "password") {
    return (
      <PasswordInput
        name={controlName}
        label={label}
        placeholder={placeholder}
        description={description}
        withAsterisk={required}
        error={error}
        style={{ minHeight: "80.2px", ...style }}
        value={value}
        onChange={(event) =>
          onChange({
            controlName: event.target.name,
            value: event.currentTarget.value,
          })
        }
        onBlur={valueValidator}
      />
    );
  } else if (type === "textarea") {
    return (
      <Textarea
        name={controlName}
        label={label}
        placeholder={placeholder}
        description={description}
        withAsterisk={required}
        error={error}
        style={style}
        value={value}
        disabled={readOnly}
        onChange={(event) => {
          onChange({
            controlName: event.target.name,
            value: event.currentTarget.value,
          });
        }}
        onBlur={valueValidator}
      />
    );
  } else {
    let section;
    if (contain === "tooltip") {
      section = (
        <Tooltip
          label={tooltipLabel}
          position="top-end"
          withArrow
          transitionProps={{ transition: "pop-bottom-right" }}
        >
          <Text component="div" c="dimmed" style={{ cursor: "help" }}>
            <Center>{icon}</Center>
          </Text>
        </Tooltip>
      );
    } else if (contain === "icon") {
      section = icon;
    }
    const sectionProps =
      align === "right"
        ? { rightSection: section }
        : align === "left"
        ? { leftSection: section }
        : {};

    return (
      <TextInput
        {...sectionProps}
        name={controlName}
        label={label}
        placeholder={placeholder}
        description={description}
        type={type}
        withAsterisk={required}
        error={error}
        disabled={readOnly}
        style={{ minHeight: description ? "99.6px" : "80.2px", ...style }}
        value={value}
        onChange={(event) =>
          onChange({
            controlName: event.target.name,
            value: event.currentTarget.value,
          })
        }
        onBlur={valueValidator}
      />
    );
  }
}
