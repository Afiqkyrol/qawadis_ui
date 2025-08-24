import { Card, Skeleton } from "@mantine/core";
import classes from "./smartCard.module.css";

export default function SmartCard({ children, isLoading, style, id = "" }) {
  return (
    <Card
      id={id}
      className={classes.card}
      style={{ marginBottom: "1rem", ...style }}
      shadow="sm"
      padding={isLoading ? 0 : "lg"}
      radius="md"
      withBorder
    >
      {isLoading ? <Skeleton height={200} radius="md" animate /> : children}
    </Card>
  );
}
