"use client";

import SignupForm from "@/app/lib/component/form/auth/signupForm";
import { Center, Container } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export default function SignupClient() {
  useEffect(() => {
    nprogress.complete();
  }, []);
  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <SignupForm />
      </Center>
    </Container>
  );
}
