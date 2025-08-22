"use client";

import { Card, Container, Space, Stack, Text, Title } from "@mantine/core";
import SmartTextInput from "../smart/input/smart-TextInput";
import { IconAbc, IconAt } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateEmail } from "../../util/validator";
import { nprogress } from "@mantine/nprogress";
import SmartButton from "../smart/button/smartButton";
import { signIn } from "next-auth/react";
import { notificationError } from "../../util/notification";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function validateField(controlName, value, currentForm = form) {
    let error = "";

    if (controlName === "username") {
      if (!value) error = "Username is required";
      else if (value.length < 3)
        error = "Username must be at least 3 characters long";
    }

    if (controlName === "email") {
      if (!value) error = "Email is required";
      else if (!validateEmail(value)) error = "Invalid email address";
    }

    if (controlName === "password") {
      if (!value) error = "Password is required";
    }

    if (controlName === "confirmPassword") {
      if (!value) error = "Confirm Password is required";
      else if (value !== currentForm.password) error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [controlName]: error }));
    return error === "";
  }

  function inputHandler({ controlName, value }) {
    setForm((prev) => {
      const next = { ...prev, [controlName]: value };

      validateField(controlName, next[controlName], next);

      if (controlName === "password" && next.confirmPassword !== "") {
        validateField("confirmPassword", next.confirmPassword, next);
      }

      if (controlName === "confirmPassword") {
        validateField("confirmPassword", next.confirmPassword, next);
      }

      return next;
    });
  }

  function validateForm() {
    const usernameValid = validateField("username", form.username, form);
    const emailValid = validateField("email", form.email, form);
    const passwordValid = validateField("password", form.password, form);
    const confirmPasswordValid = validateField(
      "confirmPassword",
      form.confirmPassword,
      form
    );
    return usernameValid && emailValid && passwordValid && confirmPasswordValid;
  }

  async function submitHandler() {
    if (!validateForm()) return;

    setLoading(true);
    nprogress.start();

    const result = await signIn("credentials", {
      username: form.username,
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
          Sign Up
        </Text>
        <Space h="sm" />
        <Stack align="stretch" justify="center" gap="sm">
          <SmartTextInput
            controlName="username"
            label="Username"
            type="text"
            contain="icon"
            icon={<IconAbc size={18} stroke={1.5} />}
            align="right"
            required
            error={errors.username}
            value={form.username}
            onChange={inputHandler}
            valueValidator={() => validateField("username", form.username)}
          />
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
          <SmartTextInput
            controlName="confirmPassword"
            label="Confirm Password"
            type="password"
            required
            error={errors.confirmPassword}
            value={form.confirmPassword}
            onChange={inputHandler}
            valueValidator={() =>
              validateField("confirmPassword", form.confirmPassword)
            }
          />
          <SmartButton
            buttonType="submit"
            loading={loading}
            submitHandler={submitHandler}
            text="Sign Up"
          />
          <Text ta="center" size="sm" mt="sm">
            Already have an account?{" "}
            <Text
              component="a"
              href="/auth/signin"
              fw={500}
              c="blue"
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Text>
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}
