"use client";
import SmartTextInput from "@/app/lib/component/smart/textInput/smart-TextInput";
import SmartButton from "@/app/lib/component/smart/button/smartButton";
import { validateEmail } from "@/app/lib/util/validator";
import { useState } from "react";
import { IconAt } from "@tabler/icons-react";
import SmartCard from "../../smart/card/smartCard";
import { Anchor, Container, Group, Title } from "@mantine/core";
import { useNavigate } from "@/app/lib/hook/useNavigate";

export default function ForgotPasswordForm() {
  const { goTo } = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

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

  function validateField(controlName, value) {
    let error = "";

    if (controlName === "email") {
      if (!value) error = "Email is required";
      else if (!validateEmail(value)) error = "Invalid email address";
    }

    setErrors((prev) => ({
      ...prev,
      [controlName]: error,
    }));

    return error === "";
  }

  return (
    <Container w="40vw" miw="300px" maw="500px">
      <Title order={1} ta="center" mb={30}>
        Forgot Password
      </Title>
      <SmartCard>
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

        <Group
          position="apart"
          align="center"
          mt="md"
          style={{ width: "100%" }}
        >
          <Anchor
            component="button"
            type="button"
            onClick={() => goTo("/auth/signin")}
            
            size="sm"
            aria-label="Back to Sign In"
          >
            Back to Sign In
          </Anchor>

          <SmartButton
            text="Send Reset Link"
            loading={loading}
            submitHandler={() => {}}
          />
        </Group>
      </SmartCard>
    </Container>
  );
}
