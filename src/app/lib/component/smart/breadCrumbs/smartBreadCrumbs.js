"use client";

import { Breadcrumbs } from "@mantine/core";
import classes from "./smartBreadCrumbs.module.css";
import { useNavigate } from "@/app/lib/hook/useNavigate";
import { usePathname } from "next/navigation";

export default function SmartBreadcrumbs({
  itemList,
  separator,
  separatorMargin = "sm",
  style,
}) {
  const { goTo } = useNavigate();
  const pathname = usePathname();

  const items = itemList.map((item, index) => (
    <span
      key={index}
      className={classes.link}
      onClick={() => {
        if (pathname !== item.href) {
          goTo(item.href);
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
      style={{ marginLeft: "1rem", ...style }}
    >
      {items}
    </Breadcrumbs>
  );
}
