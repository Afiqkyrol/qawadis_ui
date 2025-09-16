"use client";
import { nprogress } from "@mantine/nprogress";
import { useRouter } from "next/navigation";

export function useNavigate() {
  const router = useRouter();

  const goTo = (path) => {
    nprogress.start();
    nprogress.set(50);
    router.push(path);
  };

  const goBack = () => {
    nprogress.start();
    nprogress.set(50);
    router.back();
  };

  return { goTo, goBack };
}
