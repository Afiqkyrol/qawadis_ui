"use client";

import { AppShell, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../header/header";
import "./innerLayout.css";
import Navbar from "../navbar/navbar";
import { createContext, useContext } from "react";

const SessionContext = createContext(null);

export function useSession() {
  return useContext(SessionContext);
}

export default function InnerLayout({ children, session }) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <SessionContext.Provider value={session}>
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
          <Navbar toggle={toggle} />
        </AppShell.Navbar>
        {opened && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1,
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={close}
          />
        )}
        <AppShell.Main
          style={{
            filter: opened ? "blur(4px)" : "none",
            transition: "filter 0.3s ease",
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </SessionContext.Provider>
  );
}
