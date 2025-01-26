import { Group, Burger, Button, Text } from "@mantine/core";

export default function Header({ opened, toggle }) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "orange", to: "yellow", deg: 90 }}
      >
        Qawadi Sports
      </Text>

      <Group>
        <Button variant="default">Log in</Button>
      </Group>
    </Group>
  );
}
