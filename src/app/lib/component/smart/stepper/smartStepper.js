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
import { useDisclosure } from "@mantine/hooks";
import SmartModal from "../modal/smartModal";

export default function SmartStepper({
  stepList,
  allowNextStepsSelect = false,
  submitHandler = () => {},
  size = "md",
  orientation = "horizontal",
}) {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

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
          <Button
            onClick={() => {
              if (stepList[active].validation()) handleStepChange(active + 1);
            }}
          >
            Next
          </Button>
        )}

        {/* Submit button: show on last and completed step, but lock in completed */}
        {(isLastStep || isCompleted) && (
          <Button
            onClick={async () => {
              openModal();
            }}
            // disabled={isCompleted}
            loading={isLoading}
          >
            Submit
          </Button>
        )}
      </Group>
      <SmartModal
        isOpen={openedModal}
        onClose={closeModal}
        type="confirmation"
        title="Confirmation"
        description="Are you sure you want to proceed?"
        confirmAction={async () => {
          setIsLoading(true);
          if (isCompleted) return;
          const prevActive = active;
          try {
            handleStepChange(active + 1);
            closeModal();
            await submitHandler();
          } catch (err) {
            handleStepChange(prevActive);
          } finally {
            setIsLoading(false);
          }
        }}
      />
    </>
  );
}
