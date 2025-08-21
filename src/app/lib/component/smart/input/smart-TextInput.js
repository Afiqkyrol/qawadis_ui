import { TextInput, Tooltip, Text, Center, PasswordInput } from "@mantine/core";
import "./smart-TextInput.css";

export default function SmartTextInput({
  name,
  label,
  placeholder,
  type,
  contain,
  icon,
  align,
  tooltipLabel,
  error,
  required,
  value,
  setValue,
  valueValidator,
  style,
}) {
  if (type === "password") {
    return (
      <PasswordInput
        name={name}
        label={label}
        placeholder={placeholder}
        withAsterisk={required}
        error={error}
        style={style}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={valueValidator}
      />
    );
  } else if (type === "textarea") {
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
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        withAsterisk={required}
        error={error}
        style={style}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={valueValidator}
      />
    );
  }
}
