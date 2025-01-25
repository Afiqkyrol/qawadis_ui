"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { userIdleSignout } from "../../hook/userIdleSignout";
import { Container } from "@mantine/core";

export default function HomeClient() {
  // userIdleSignout(3 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <Container fluid h="100vh">
      <p>Home</p>
    </Container>
  );
}
