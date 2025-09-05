"use client";

import { Breadcrumbs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import classes from "./smartBreadCrumbs.module.css";
import { nprogress } from "@mantine/nprogress";

export default function SmartBreadcrumbs({
  itemList,
  separator,
  separatorMargin = "sm",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const items = itemList.map((item, index) => (
    <span
      key={index}
      className={classes.link}
      onClick={() => {
        if (pathname !== item.href) {
          nprogress.start();
          nprogress.set(50);
          router.push(item.href);
        }
      }}
    >
      {item.title}
    </span>
  ));

  return (
    <Breadcrumbs
      separator={separator}
      separatorMargin={separatorMargin}
      style={{ marginBottom: "1rem", marginLeft: "1rem" }}
    >
      {items}
    </Breadcrumbs>
  );
}
