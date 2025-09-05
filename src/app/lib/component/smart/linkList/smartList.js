import { Badge, UnstyledButton } from "@mantine/core";
import classes from "./smartLinkList.module.css";
import { useRouter, usePathname } from "next/navigation";
import { nprogress } from "@mantine/nprogress";

export default function SmartLinkList({ itemList, toggle }) {
  const router = useRouter();
  const pathname = usePathname();

  const normalizePath = (path) => path.replace(/\/+$/, ""); // remove trailing slash

  const mainLinks = itemList.map((item, index) => {
    const linkPath = normalizePath("/home" + item.link);
    let isActive;
    if (linkPath === "/home") {
      isActive = normalizePath(pathname) === linkPath;
    } else {
      isActive = normalizePath(pathname).startsWith(linkPath);
    }

    return (
      <UnstyledButton
        data-active={isActive || undefined}
        onClick={() => {
          nprogress.start();
          nprogress.set(50);
          router.push(linkPath);
          toggle();
        }}
        key={item.label}
        className={classes.mainLink}
      >
        <div className={classes.mainLinkInner}>
          {item.icon && (
            <item.icon
              size={20}
              className={classes.mainLinkIcon}
              stroke={1.5}
            />
          )}
          <span>{item.label}</span>
        </div>
        {item.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {item.notifications}
          </Badge>
        )}
      </UnstyledButton>
    );
  });

  return <div className={classes.mainLinks}>{mainLinks}</div>;
}
