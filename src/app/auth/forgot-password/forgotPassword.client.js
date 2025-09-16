"use client";
import { useEffect, useState } from "react";
import SmartCard from "@/app/lib/component/smart/card/smartCard";
import SmartTitle from "@/app/lib/component/smart/title/smartTitle";
import SmartButton from "@/app/lib/component/smart/button/smartButton";
import SmartTextInput from "@/app/lib/component/smart/textInput/smart-TextInput";
import { IconMail } from "@tabler/icons-react";
import { sendForgotPassword } from "./service";
import { useNavigate } from "@/app/lib/hook/useNavigate";
import { nprogress } from "@mantine/nprogress";
import ForgotPasswordForm from "@/app/lib/component/form/auth/forgotPasswordForm";
import { Center, Container } from "@mantine/core";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }
  const { goTo } = useNavigate();

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <ForgotPasswordForm />
      </Center>
    </Container>
  );
}
