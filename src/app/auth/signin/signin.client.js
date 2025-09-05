"use client";

import SigninForm from "@/app/lib/component/form/auth/signinForm";
import { Center, Container } from "@mantine/core";

export default function SigninClient() {
  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <SigninForm />
      </Center>
    </Container>
  );
}
