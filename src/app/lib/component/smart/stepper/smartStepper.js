import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Divider,
  Box,
  LoadingOverlay,
  Loader,
} from "@mantine/core";

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

          <Box pos="relative">
            <LoadingOverlay
              visible={true}
              loaderProps={{ children: <Loader color="blue" /> }}
            />
            {stepList.at(-1)?.content}
          </Box>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="md">
        {/* Prev button: show on all steps except first and completed */}
        {active > 0 && (
          <Button
            variant="default"
            disabled={isCompleted}
            onClick={() => handleStepChange(active - 1)}
          >
            Prev
          </Button>
        )}

        {/* Next button: show on all steps except last and completed */}
        {!isLastStep && !isCompleted && (
          <Button onClick={() => handleStepChange(active + 1)}>Next</Button>
        )}

        {/* Submit button: show on last and completed step, but lock in completed */}
        {(isLastStep || isCompleted) && (
          <Button
            onClick={async () => {
              if (isCompleted) return;
              const prevActive = active;
              try {
                handleStepChange(active + 1);
                await submitHandler();
              } catch (err) {
                handleStepChange(prevActive);
              }
            }}
            disabled={isCompleted}
          >
            Submit
          </Button>
        )}
      </Group>
    </>
  );
}
