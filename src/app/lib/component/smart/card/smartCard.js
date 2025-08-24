import { Card } from "@mantine/core";
import classes from "./smartCard.module.css";

export default function SmartCard({ children }) {
  return (
    <Card
      className={classes.card}
      style={{ marginBottom: "1rem" }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      {children}
    </Card>
  );
}
