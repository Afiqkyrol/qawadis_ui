import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

export default function SmartButton({
  buttonType = "default",
  loading,
  submitHandler,
  text,
  icon,
  style,
}) {
  const [isLoading, setIsLoading] = useState(loading);

  if (buttonType === "submit") {
    return (
      <Button
        style={{ ...style }}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        rightSection={icon}
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
        rightSection={icon}
        onClick={submitHandler}
        loading={loading}
      >
        {text}
      </Button>
    );
  }

  if (buttonType === "default") {
    return (
      <Button
        style={{ ...style }}
        rightSection={icon}
        onClick={submitHandler}
        loading={loading}
      >
        {text}
      </Button>
    );
  }
}
