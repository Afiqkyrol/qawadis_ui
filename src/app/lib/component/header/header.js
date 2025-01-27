import { Group, Burger, Button, Text } from "@mantine/core";

export default function Header({ opened, toggle }) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "#a4133c", to: "#ff4d6d", deg: 90 }}
      >
        Qawadi Sports
      </Text>

      <div></div>
    </Group>
  );
}
