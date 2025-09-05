"use client";

import SmartBreadcrumbs from "@/app/lib/component/smart/breadCrumbs/smartBreadCrumbs";
import SmartTitle from "@/app/lib/component/smart/title/smartTitle";
import { nprogress } from "@mantine/nprogress";
import { IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";

const items = [
  { title: "Activity", href: "/home/activity" },
  { title: "New Activity", href: "/home/activity/new-activity" },
];

export default function NewActivityClientPage() {
  useEffect(() => {
    nprogress.complete();
  }, []);
  return (
    <>
      <SmartTitle title="New Activity" Icon={IconPlus} />
      <SmartBreadcrumbs itemList={items} />
    </>
  );
}
