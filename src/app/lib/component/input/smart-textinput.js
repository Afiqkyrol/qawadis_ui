import { TextInput, Tooltip, Text, Center } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function SmartTextInput({
  label,
  placeholder,
  type,
  contain,
  icon,
  align,
  tooltipLabel,
}) {
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

  if (type === "password") {
  } else {
    if (align === "right") {
      return (
        <TextInput
          rightSection={section}
          label={label}
          placeholder={placeholder}
        />
      );
    } else if (align === "left") {
      return (
        <TextInput
          leftSection={section}
          label={label}
          placeholder={placeholder}
          type={type}
        />
      );
    } else {
      return <TextInput label={label} placeholder={placeholder} />;
    }
  }
}
