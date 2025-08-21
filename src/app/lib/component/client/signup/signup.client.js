"use client";

import { Center, Container } from "@mantine/core";
import SignupForm from "../../form/signupForm";
import SmartCenter from "../../smart/center/smartCenter";

export default function SignupClient() {
  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <SignupForm />
      </Center>
    </Container>
  );
}
