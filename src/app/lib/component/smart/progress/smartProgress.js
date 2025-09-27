import { Progress } from "@mantine/core";

export default function SmartProgress({ currentValue, totalValue }) {
  return (
    <div style={{ width: "100%" }}>
      <Progress
        value={(currentValue / totalValue) * 100}
        size="lg"
        transitionDuration={200}
      />
    </div>
  );
}
