import { Group, Burger, Button } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

export default function Header({ opened, toggle }) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <MantineLogo size={30} />

      <Group>
        <Button variant="default">Log in</Button>
      </Group>
    </Group>
  );
}
