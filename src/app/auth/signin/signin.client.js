"use client";

import SigninForm from "@/app/lib/component/form/auth/signinForm";
import { Center, Container, Box } from "@mantine/core";
import { useEffect } from "react";
import { nprogress } from "@mantine/nprogress";

export default function SigninClient() {
  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <SigninForm />
      </Center>
    </Container>
  );
}
