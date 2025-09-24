import { Card, Skeleton } from "@mantine/core";
import classes from "./smartCard.module.css";

export default function SmartCard({
  children,
  isLoading,
  style,
  id = "",
  theme = "primary",
  smallSkeleton = false,
  color,
}) {
  const colorClasses = {
    green: classes.cardGreen,
    red: classes.cardRed,
    gray: classes.cardGray,
  };
  return (
    <Card
      id={id}
      className={colorClasses[color] || classes.card}
      shadow="sm"
      padding={isLoading ? 0 : "lg"}
      radius="md"
      withBorder
    >
      {isLoading ? (
        <Skeleton height={smallSkeleton ? 80 : 250} radius="md" animate />
      ) : (
        children
      )}
    </Card>
  );
}
