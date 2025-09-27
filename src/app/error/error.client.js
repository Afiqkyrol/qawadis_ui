"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Center,
  Paper,
  Image,
  Stack,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "../lib/hook/useNavigate";

export default function ErrorClient({ errorMessage }) {
  const { goTo, goBack } = useNavigate();

  useEffect(() => {
    nprogress.complete();
  }, []);

  return (
    <Container size="md" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <Paper shadow="md" radius="md" p="xl">
        <Stack align="center" spacing="md">
          <Center
            style={{
              width: 120,
              height: 120,
              borderRadius: 99,
              backgroundColor: "var(--mantine-color-red-1)",
            }}
          >
            <IconAlertCircle
              size={72}
              stroke={1.5}
              color="var(--mantine-color-red-6)"
            />
          </Center>

          <Title order={2} align="center">
            Oops — something went wrong
          </Title>

          <Text c="dimmed" size="md" align="center">
            We couldn't handle this request.{" "}
            {errorMessage
              ? errorMessage
              : "You can go back to try again or return to the homepage."}
          </Text>

          <Group spacing="sm" position="center" mt="md">
            <Button onClick={() => goTo("/home")}>Home</Button>
            <Button variant="outline" onClick={() => goBack()}>
              Retry
            </Button>
          </Group>

          <Text c="dimmed" size="xs" align="center">
            If the problem persists, contact support or try again later.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
