import { Box, Burger, Group } from "@mantine/core";
import classes from "./header.module.css";
import LogoCerouno from "../svg/logo";
import SmartButton from "../smart/button/smartButton";
import { nprogress } from "@mantine/nprogress";
import { signOut } from "next-auth/react";
import { IconArrowRight } from "@tabler/icons-react";

export default function Header({ opened, toggle }) {
  async function submitHandler() {
    nprogress.start();
    nprogress.set(50);
    await signOut({ callbackUrl: "/auth/signin" });
    nprogress.complete();
  }
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group className={classes.group}>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <LogoCerouno size="80" />
          <Box hiddenFrom="sm"></Box>
          <Box visibleFrom="sm">
            <SmartButton
              buttonType="cancel"
              submitHandler={submitHandler}
              text={"Sign Out"}
              icon={<IconArrowRight size={14} />}
            />
          </Box>
        </Group>
      </div>
    </header>
  );
}
