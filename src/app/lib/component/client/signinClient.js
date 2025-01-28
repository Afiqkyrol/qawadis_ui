"use client";

import SigninForm from "../form/signinForm";
import { Center, Container } from "@mantine/core";

export default function SigninClient() {
  return (
    <Container fluid h="100vh" bg="#e3f2fd">
      <Center h="100%">
        <SigninForm />
      </Center>
    </Container>
  );
}
