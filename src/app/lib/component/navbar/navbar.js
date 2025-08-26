import {
  IconArrowRight,
  IconBallFootball,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import { Box } from "@mantine/core";
import classes from "./navbar.module.css";
import SmartUserButton from "../smart/button/smartUserButton";
import { nprogress } from "@mantine/nprogress";
import { signOut } from "next-auth/react";
import SmartButton from "../smart/button/smartButton";
import SmartCenter from "../smart/center/smartCenter";
import SmartLinkList from "../smart/linkList/smartList";
import { useSession } from "../layout/innerLayout";

const itemList = [
  { icon: IconHome, label: "Home", notifications: 3, link: "/" },
  {
    icon: IconBallFootball,
    label: "Activity",
    notifications: 4,
    link: "/activity",
  },
  { icon: IconUser, label: "Contacts", link: "/test" },
];

export default function Navbar() {
  const session = useSession();
  async function submitHandler() {
    nprogress.start();
    nprogress.set(50);
    await signOut({ callbackUrl: "/auth/signin" });
  }

  return (
    <nav className={classes.navbar}>
      <div>
        <div className={classes.section}>
          <SmartUserButton session={session} />
        </div>
        <div className={classes.section}>
          <SmartLinkList itemList={itemList} />
        </div>
      </div>
      <div className={classes.footer}>
        <Box hiddenFrom="sm">
          <SmartCenter style={{ padding: "5px" }}>
            <SmartButton
              style={{ width: "90%" }}
              buttonType="cancel"
              submitHandler={submitHandler}
              text={"Sign Out"}
              icon={<IconArrowRight size={14} />}
            />
          </SmartCenter>
        </Box>
      </div>
    </nav>
  );
}
