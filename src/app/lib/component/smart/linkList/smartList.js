import { Badge, UnstyledButton } from "@mantine/core";
import classes from "./smartLinkList.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SmartLinkList({ itemList }) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const mainLinks = itemList.map((item, index) => (
    <UnstyledButton
      data-active={active === index || undefined}
      onClick={() => {
        setActive(index);
        router.push("/home" + item.link);
      }}
      key={item.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        {item.icon && (
          <item.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        )}
        <span>{item.label}</span>
      </div>
      {item.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {item.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return <div className={classes.mainLinks}>{mainLinks}</div>;
}
