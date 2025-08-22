"use client";

import SmartTextInput from "@/app/lib/component/smart/input/smart-TextInput";
import { validateEmail } from "@/app/lib/util/validator";
import { notificationError } from "@/app/lib/util/notification";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import SmartButton from "../smart/button/smartButton";
import { Card, Container, Space, Stack, Text, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { nprogress } from "@mantine/nprogress";

export default function SigninForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function inputHandler({ controlName, value }) {
    setForm((prev) => ({
      ...prev,
      [controlName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [controlName]: "",
    }));
  }

  // field validator
  function validateField(controlName, value) {
    let error = "";

    if (controlName === "email") {
      if (!value) error = "Email is required";
      else if (!validateEmail(value)) error = "Invalid email address";
    }

    if (controlName === "password") {
      if (!value) error = "Password is required";
    }

    setErrors((prev) => ({
      ...prev,
      [controlName]: error,
    }));

    return error === "";
  }

  function validateForm() {
    const emailValid = validateField("email", form.email);
    const passwordValid = validateField("password", form.password);
    return emailValid && passwordValid;
  }

  async function submitHandler() {
    if (!validateForm()) return;

    setLoading(true);
    nprogress.start();

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/home");
    } else {
      notificationError("An error occurred!", result.error);
      setLoading(false);
    }

    nprogress.complete();
  }

  return (
    <Container w="40vw" miw="300px" maw="500px">
      <Title order={1} ta="center" mb={30}>
        Qawadi Sports
      </Title>
      <Card shadow="xl" padding="lg" radius="md">
        <Text
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          size="xl"
          fw={900}
          fz="lg"
        >
          Sign In
        </Text>
        <Space h="sm" />
        <Stack align="stretch" justify="center" gap="sm">
          <SmartTextInput
            controlName="email"
            label="Email"
            type="email"
            contain="icon"
            icon={<IconAt size={18} stroke={1.5} />}
            align="right"
            required
            error={errors.email}
            value={form.email}
            onChange={inputHandler}
            valueValidator={() => validateField("email", form.email)}
          />
          <SmartTextInput
            controlName="password"
            label="Password"
            type="password"
            required
            error={errors.password}
            value={form.password}
            onChange={inputHandler}
            valueValidator={() => validateField("password", form.password)}
          />
          <SmartButton
            buttonType="submit"
            loading={loading}
            submitHandler={submitHandler}
            text="Sign In"
          />
          <Text ta="center" size="sm" mt="sm">
            Don’t have an account?{" "}
            <Text
              component="a"
              href="/auth/signup"
              fw={500}
              c="blue"
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </Text>
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}
