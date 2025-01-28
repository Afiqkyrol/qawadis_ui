import { IconBulb, IconCheckbox, IconUser } from "@tabler/icons-react";
import { Badge, UnstyledButton } from "@mantine/core";
import classes from "./navbar.module.css";
import SmartUserButton from "../smart/button/smart-UserButton";

const links = [
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts" },
];

export default function Navbar({ session }) {
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
      <div className={classes.footer}>Footer</div>
    </nav>
  );
}
