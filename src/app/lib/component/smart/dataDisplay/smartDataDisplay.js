import { ActionIcon, Grid, Text } from "@mantine/core";
import classes from "./smartDataDisplay.module.css";

export default function SmartDataDisplay({ data }) {
  return (
    <Grid>
      {data.map((item, index) => (
        <Grid.Col key={index} span={item.span || 4}>
          <div className={classes.dataContainer}>
            <div className={classes.dataIconContainer}>
              <ActionIcon
                style={{ cursor: "default" }}
                size="xl"
                variant="light"
                color={item.iconColor || "blue"}
              >
                {item.icon}
              </ActionIcon>
            </div>
            <div className={classes.dataTextContainer}>
              <Text size="sm" c="dimmed">
                {item.label}
              </Text>
              <Text size="md" fw={500}>
                {item.value}
              </Text>
            </div>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
}
