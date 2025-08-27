import { Modal, Button, Group, Text } from "@mantine/core";

export default function SmartModal({
  isOpen,
  onClose,
  type,
  title,
  description,
  confirmAction,
  actionButtonColor = "var(--mantine-color-blue-6)",
}) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      radius="lg"
      title={title || "Smart Modal"}
      centered
    >
      {description && <Text>{description}</Text>}

      {type === "confirmation" ? (
        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            color="var(--mantine-color-gray-6)"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button color={actionButtonColor} onClick={confirmAction}>
            Confirm
          </Button>
        </Group>
      ) : (
        <Text>test</Text>
      )}
    </Modal>
  );
}
