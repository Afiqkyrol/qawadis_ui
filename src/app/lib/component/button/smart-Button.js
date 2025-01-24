import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export default function SmartButton({
  buttonType,
  loading,
  toggle,
  submitHandler,
}) {
  if (buttonType === "submit") {
    return (
      <Button
        variant="gradient"
        gradient={{ from: "violet", to: "grape", deg: 90 }}
        rightSection={<IconArrowRight size={14} />}
        onClick={() => {
          toggle(true);
          submitHandler();
        }}
        loading={loading}
      >
        Sign In
      </Button>
    );
  }
}
