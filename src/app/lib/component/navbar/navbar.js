import { IconBulb, IconCheckbox, IconUser } from "@tabler/icons-react";
import { Badge, Box, UnstyledButton } from "@mantine/core";
import classes from "./navbar.module.css";
import SmartUserButton from "../smart/button/smartUserButton";
import { nprogress } from "@mantine/nprogress";
import { signOut } from "next-auth/react";
import SmartButton from "../smart/button/smartButton";
import SmartCenter from "../smart/center/smartCenter";

const links = [
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts" },
];

export default function Navbar({ session }) {
  async function submitHandler() {
    nprogress.start();
    nprogress.set(50);
    await signOut({ callbackUrl: "/auth/signin" });
    nprogress.complete();
  }

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <div className={classes.section}>
          <SmartUserButton session={session} />
        </div>
        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>
      </div>
      <div className={classes.footer}>
        <Box hiddenFrom="sm">
        <SmartCenter style={{ padding: "5px" }}>
          <SmartButton
            style={{ width: "90%" }}
            buttonType="cancel"
            submitHandler={submitHandler}
            text={"Sign Out"}
          />
        </SmartCenter></Box>
      </div>
    </nav>
  );
}
