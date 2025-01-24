"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export function userIdleSignout(timeout = 3 * 24 * 60 * 60 * 1000) {
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const resetTimer = () => {
      setLastActivity(Date.now());
    };

    const checkIdle = () => {
      if (Date.now() - lastActivity > timeout) {
        console.log("User is idle for too long, signing out...");
      }
    };

    const interval = setInterval(checkIdle, 1000);

    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [lastActivity, timeout]);

  return { resetTimer: () => setLastActivity(Date.now()) };
}
