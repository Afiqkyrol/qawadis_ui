import { Title, Text, ActionIcon } from "@mantine/core";
import SmartCard from "../card/smartCard";
import classes from "./smartHeader.module.css";
import SmartStatusBadge from "../smartStatusBadge/smartStatusBadge";
import { IconUser } from "@tabler/icons-react";
import SmartDataDisplay from "../dataDisplay/smartDataDisplay";

export default function SmartHeader({
  title,
  description,
  status,
  data,
  isLoading,
}) {
  return (
    <SmartCard isLoading={isLoading}>
      <div className={classes.parentContainer}>
        <div className={classes.statusContainer}>
          <SmartStatusBadge value={status} />
        </div>
        <div className={classes.textContainer}>
          <Title className={classes.title} order={1}>
            {title}
          </Title>
          <Text className={classes.description} size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        {data}
      </div>
    </SmartCard>
  );
}
