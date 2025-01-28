"use client";

import { AppShell, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../header/header";
import "./innerLayout.css";
import Navbar from "../navbar/navbar";

export default function InnerLayout({ children, session }) {
  const [opened, { toggle }] = useDisclosure();

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
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        {/* {session.user.username}
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={true} />
          ))} */}
        <Navbar session={session} />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          filter: opened ? "blur(4px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
