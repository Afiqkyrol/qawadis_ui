import { Burger, Group } from "@mantine/core";
import classes from "./header.module.css";
import LogoCerouno from "../svg/logo";

export default function Header({ opened, toggle }) {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <LogoCerouno size="80" />
        </Group>
      </div>
    </header>
  );
}
