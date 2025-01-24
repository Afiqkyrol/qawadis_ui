"use client";

import SmartTextInput from "@/app/lib/component/input/smart-TextInput";
import { validateEmail } from "@/app/lib/util/validator";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import SmartButton from "../button/smart-Button";
import { useDisclosure } from "@mantine/hooks";
import { Card, Container, Space, Text, Title } from "@mantine/core";
import { signIn } from "next-auth/react";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ovalLoading, setOvalLoading] = useState(false);

  function emailHandler(input) {
    setEmail(input);
    if (validateEmail(input)) {
      setEmailError("");
    }
  }

  function passwordHandler(input) {
    setPassword(input);
    if (input != "") {
      setPasswordError("");
    }
  }

  function emailValidator() {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }

  function passwordValidator() {
    if (password === "") {
      setPasswordError("Password is required");
    }
  }

  async function submitHandler(e) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = "/";
    } else {
      console.log("here");
      console.log(result);
      setOvalLoading(false);
    }
  }

  return (
    <Container w="40vw" miw="300px" maw="500px">
      <Card shadow="xl" padding="lg" radius="md">
        <Title order={1}>Qawadi Sports</Title>
        <Space h="md" />
        <Text
          variant="gradient"
          gradient={{ from: "violet", to: "grape", deg: 90 }}
          size="xl"
          fw={900}
          fz="lg"
        >
          Sign In
        </Text>
        <Space h="md" />
        <SmartTextInput
          name="email"
          label="Email"
          type="email"
          contain="icon"
          icon={<IconAt size={18} stroke={1.5} />}
          align="right"
          required={true}
          error={emailError}
          value={email}
          setValue={emailHandler}
          valueValidator={emailValidator}
        />
        <SmartTextInput
          name="password"
          label="Password"
          type="password"
          required={true}
          error={passwordError}
          value={password}
          setValue={passwordHandler}
          valueValidator={passwordValidator}
        />
        <Space h="md" />
        <SmartButton
          buttonType="submit"
          loading={ovalLoading}
          toggle={setOvalLoading}
          submitHandler={submitHandler}
        />
      </Card>
    </Container>
  );
}
