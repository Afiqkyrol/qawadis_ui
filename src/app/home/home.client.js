"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { IconHome } from "@tabler/icons-react";
import SmartTitle from "../lib/component/smart/title/smartTitle";

export default function HomeClient() {
  // userIdleSignout(3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    nprogress.complete();
  }, []);

  return <SmartTitle title="Home" Icon={IconHome} />;
}
