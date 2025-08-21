"use client";

import { Card, Text } from "@mantine/core";
import SmartTextInput from "../smart/input/smart-TextInput";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IconAbc, IconAt } from "@tabler/icons-react";
import { validateEmail } from "../../util/validator";
import SmartCenter from "../smart/center/smartCenter";
import { nprogress } from "@mantine/nprogress";
import SmartButton from "../smart/button/smartButton";
import { signIn } from "next-auth/react";
import { notificationError } from "../../util/notification";

export default function SignupForm() {
  const router = useRouter();
  const [ovalLoading, setOvalLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function usernameHandler(input) {
    setUsername(input);
    if (input !== "") setUsernameError("");
  }

  function emailHandler(input) {
    setEmail(input);
    if (validateEmail(input)) setEmailError("");
  }

  function passwordHandler(input) {
    setPassword(input);
    if (input !== "") setPasswordError("");
  }

  function confirmPasswordHandler(input) {
    setConfirmPassword(input);
  }

  function usernameValidator() {
    if (username === "") {
      setUsernameError("Username is required");
      return false;
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return false;
    }
    setUsernameError("");
    return true;
  }

  function emailValidator() {
    if (email === "") {
      setEmailError("Email is required");
      return false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  }

  function passwordValidator() {
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  }

  function confirmPasswordValidator() {
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  }

  useEffect(() => {
    if (confirmPassword !== "") {
      confirmPasswordValidator();
    }
  }, [password, confirmPassword]);

  function formValidator() {
    return (
      usernameValidator() &&
      emailValidator() &&
      passwordValidator() &&
      confirmPasswordValidator()
    );
  }

  async function submitHandler() {
    if (formValidator()) {
      setOvalLoading(true);
      nprogress.start();
      nprogress.set(50);
      nprogress.stop();

      const result = await signIn("credentials", {
        username,
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        nprogress.start();
        router.push("/home");
      } else {
        nprogress.complete();
        notificationError("An error occurred!", result.error);
        setOvalLoading(false);
      }
    }
  }

  return (
    <Card w={"25%"} shadow="sm" padding="lg" radius="md" withBorder>
      <SmartCenter>
        <Text
          style={{ width: "100%", marginBottom: "1rem" }}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          size="xl"
          fw={900}
          fz="lg"
        >
          Sign Up
        </Text>
      </SmartCenter>
      <SmartCenter>
        <SmartTextInput
          style={{ width: "100%" }}
          name="username"
          label="Username"
          type="text"
          contain="icon"
          icon={<IconAbc size={18} stroke={1.5} />}
          align="right"
          required={true}
          error={usernameError}
          value={username}
          setValue={usernameHandler}
          valueValidator={usernameValidator}
        />
      </SmartCenter>
      <SmartCenter>
        <SmartTextInput
          style={{ width: "100%" }}
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
      </SmartCenter>
      <SmartCenter>
        <SmartTextInput
          style={{ width: "100%" }}
          name="password"
          label="Password"
          type="password"
          required={true}
          error={passwordError}
          value={password}
          setValue={passwordHandler}
          valueValidator={passwordValidator}
        />
      </SmartCenter>
      <SmartCenter>
        <SmartTextInput
          style={{ width: "100%" }}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required={true}
          error={confirmPasswordError}
          value={confirmPassword}
          setValue={confirmPasswordHandler}
          valueValidator={confirmPasswordValidator}
        />
      </SmartCenter>
      <SmartCenter>
        <SmartButton
          style={{ marginTop: "1rem", width: "100%" }}
          buttonType="submit"
          loading={ovalLoading}
          submitHandler={submitHandler}
          text="Sign In"
        />
      </SmartCenter>
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
    </Card>
  );
}
