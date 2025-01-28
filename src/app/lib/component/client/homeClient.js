"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { userIdleSignout } from "../../hook/userIdleSignout";
import { Container } from "@mantine/core";
import Hero from "../hero/hero";

export default function HomeClient() {
  // userIdleSignout(3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
}
