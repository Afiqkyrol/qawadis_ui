import { RingProgress, Text } from "@mantine/core";
import classes from "./smartRingProgress.module.css";

export default function SmartRingProgress({
  progressLabel = "",
  nameLabel = "Completed",
  currentValue = 0,
  totalValue = 1,
}) {
  return (
    <RingProgress
      roundCaps
      thickness={8}
      size={150}
      sections={[
        {
          value: (currentValue / totalValue) * 100,
          color: "var(--mantine-color-blue-6)",
        },
      ]}
      label={
        <div>
          <Text ta="center" fz="lg" className={classes.label}>
            {progressLabel
              ? progressLabel
              : `${(currentValue / totalValue) * 100}%`}
          </Text>
          <Text ta="center" fz="xs" c="dimmed">
            {nameLabel}
          </Text>
        </div>
      }
    />
  );
}
