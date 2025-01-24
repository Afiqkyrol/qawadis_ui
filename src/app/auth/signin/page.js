"use client";

import SigninForm from "@/app/lib/component/form/signinForm";
import { Center, Container } from "@mantine/core";

export default function SigninPage() {
  return (
    <Container fluid h="100vh" bg="#f4effa">
      <Center h="100%">
        <SigninForm />
      </Center>
    </Container>
  );
}
