"use client";

import { AppShell, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../lib/component/header/header";
import React, { useState } from "react";

export default function HomeLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const [user, setUser] = useState(null);

  return (
    <AppShell
      header={{ height: { base: 60 } }}
      navbar={{
        width: { base: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header bg="">
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="">
        {user}
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={true} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main bg="">
        {React.cloneElement(children, { setUser })}
      </AppShell.Main>
    </AppShell>
  );
}
