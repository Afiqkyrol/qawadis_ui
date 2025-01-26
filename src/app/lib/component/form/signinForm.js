"use client";

import SmartTextInput from "@/app/lib/component/input/smart-TextInput";
import { validateEmail } from "@/app/lib/util/validator";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import SmartButton from "../button/smart-Button";
import { Card, Container, Space, Stack, Text, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { nprogress } from "@mantine/nprogress";

export default function SigninForm() {
  const router = useRouter();
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
    if (email === "") {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
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
    nprogress.start();

    setOvalLoading(true);

    nprogress.set(50);
    nprogress.stop();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      nprogress.start();
      router.push("/home");
    } else {
      nprogress.complete();
      setOvalLoading(false);
    }
  }

  return (
    <Container w="40vw" miw="300px" maw="500px">
      <Title order={1} ta="center" mb={30}>
        Qawadi Sports
      </Title>
      <Card shadow="xl" padding="lg" radius="md">
        <Text
          variant="gradient"
          gradient={{ from: "#ffa300", to: "#ffcd00", deg: 45 }}
          size="xl"
          fw={900}
          fz="lg"
        >
          Sign In
        </Text>
        <Space h="sm" />
        <Stack align="stretch" justify="center" gap="sm">
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
          <SmartButton
            buttonType="submit"
            loading={ovalLoading}
            submitHandler={submitHandler}
          />
        </Stack>
      </Card>
    </Container>
  );
}
