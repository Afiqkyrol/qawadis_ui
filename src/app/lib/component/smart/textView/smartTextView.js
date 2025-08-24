import { Badge, Box, Grid, Stack, Text } from "@mantine/core";

export default function SmartTextView({ data, columns = 2 }) {
  return (
    <Grid gutter="sm">
      {data.map((item, index) => (
        <Grid.Col key={index} span={12 / columns}>
          <Stack gap={2}>
            <Text size="sm" c="dimmed">
              {item.label}
            </Text>
            {item.label === "Status" ? (
              <Badge
                color={item.value === "Active" ? "green" : "red"}
                radius="sm"
                variant="filled"
              >
                {item.value}
              </Badge>
            ) : (
              <Text fw={500}>{item.value}</Text>
            )}
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
  );
}
