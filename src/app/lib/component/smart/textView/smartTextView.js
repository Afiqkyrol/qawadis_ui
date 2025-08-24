import { Badge, Grid, Stack, Text } from "@mantine/core";

export default function SmartTextView({ data, columns }) {
  return (
    <Grid justify="flex-start" gutter="md">
      {data.map((item, index) => (
        <Grid.Col
          key={index}
          span={columns ? 12 / columns : { sm: 6, base: 6, md: 4, lg: 3 }}
        >
          <Stack gap={2}>
            <Text
              size="sm"
              style={{
                textAlign: "left",
                color: "var(--mantine-color-blue-6)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "default",
              }}
              title={item.label}
            >
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
              <Text
                fw={500}
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "help",
                }}
                title={item.value}
              >
                {item.value}
              </Text>
            )}
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
  );
}
