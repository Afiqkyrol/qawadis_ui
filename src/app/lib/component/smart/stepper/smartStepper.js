import { useState } from "react";
import { Stepper, Button, Group, Divider } from "@mantine/core";

export default function SmartStepper({
  stepList,
  allowNextStepsSelect = false,
  submitHandler = () => {},
  size = "md",
  orientation = "horizontal",
}) {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(0);

  const handleStepChange = (nextStep) => {
    if (nextStep < 0 || nextStep > stepList.length) return;
    setActive(nextStep);
    setHighestStepVisited((prev) => Math.max(prev, nextStep));
  };

  const isLastStep = active === stepList.length - 1;
  const isCompleted = active === stepList.length;

  return (
    <>
      <Stepper
        orientation={orientation}
        allowNextStepsSelect={allowNextStepsSelect}
        active={active}
        size={size}
        onStepClick={setActive}
      >
        {stepList.map((step, idx) => (
          <Stepper.Step
            key={idx}
            label={step.label}
            description={step.description}
            allowStepSelect={highestStepVisited >= idx && active !== idx}
          >
            <Divider my="xs" />
            {step.content}
          </Stepper.Step>
        ))}
        <Stepper.Completed>
          <Divider my="xs" />
          {stepList.at(-1)?.content}
        </Stepper.Completed>
      </Stepper>

      {!isCompleted && (
        <Group justify="center" mt="md">
          {active > 0 && (
            <Button
              variant="default"
              onClick={() => handleStepChange(active - 1)}
            >
              Prev
            </Button>
          )}

          {isLastStep ? (
            <Button
              onClick={async () => {
                const prevActive = active;
                try {
                  handleStepChange(active + 1);
                  await submitHandler();
                } catch (err) {
                  handleStepChange(prevActive);
                }
              }}
            >
              Submit
            </Button>
          ) : (
            <Button onClick={() => handleStepChange(active + 1)}>Next</Button>
          )}
        </Group>
      )}
    </>
  );
}
