"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { Container } from "@mantine/core";
import SmartList from "../smart/linkList/smartList";
import { IconBulb, IconCheckbox, IconUser } from "@tabler/icons-react";

export default function HomeClient() {
  // userIdleSignout(3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, []);

  const itemList = [
    { icon: IconBulb, label: "Activity", notifications: 3, link: "/#satu" },
    { icon: IconCheckbox, label: "Tasks", notifications: 4, link: "/#dua" },
    { icon: IconUser, label: "Contacts", link: "/#tiga" },
  ];

  return <SmartList itemList={itemList} />;
}
