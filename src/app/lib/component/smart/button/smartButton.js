import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export default function SmartButton({ buttonType, loading, submitHandler, text, style }) {
  if (buttonType === "submit") {
    return (
      <Button
        style={{ ...style }}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        rightSection={<IconArrowRight size={14} />}
        onClick={submitHandler}
        loading={loading}
      >
        {text}
      </Button>
    );
  }

  if (buttonType === "cancel") {
    return (
      <Button
        style={{ ...style }}
        variant="gradient"
        gradient={{ from: "red", to: "orange", deg: 90 }}
        rightSection={<IconArrowRight size={14} />}
        onClick={submitHandler}
        loading={loading}
      >
        {text}
      </Button>
    );
  }
}
