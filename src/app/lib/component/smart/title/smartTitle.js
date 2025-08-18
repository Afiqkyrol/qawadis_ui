import { Card, Title } from "@mantine/core";
import classes from "./smartTitle.module.css";

export default function SmartTitle({ title, Icon }) {
  return (
    <Card shadow="sm" radius="lg" withBorder className={classes.card}>
      <div className={classes.header}>
        {Icon && <Icon size={28} className={classes.icon} />}
        <Title order={2} className={classes.title}>
          {title}
        </Title>
      </div>
    </Card>
  );
}
