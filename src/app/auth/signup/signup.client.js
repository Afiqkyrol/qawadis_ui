"use client";

import SignupForm from "@/app/lib/component/form/auth/signupForm";
import { Center, Container } from "@mantine/core";

export default function SignupClient() {
  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <SignupForm />
      </Center>
    </Container>
  );
}
