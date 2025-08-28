import { Badge } from "@mantine/core";

export default function SmartStatusBadge({ value, cursor = "default" }) {
  return (
    <Badge
      style={{ cursor }}
      color={value === "Active" ? "green" : "red"}
      radius="sm"
      variant="filled"
    >
      {value}
    </Badge>
  );
}
