"use client";

import {
  Container,
  Paper,
  Stack,
  Center,
  Title,
  Text,
  Group,
  Button,
  Image,
} from "@mantine/core";
import { IconFileUnknown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { nprogress } from "@mantine/nprogress";
import { useNavigate } from "./lib/hook/useNavigate";

export default function NotFoundClient() {
  const router = useRouter();
  const { goTo, goBack } = useNavigate();

  useEffect(() => {
    nprogress?.complete && nprogress.complete();
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
              backgroundColor: "var(--mantine-color-violet-1)",
            }}
          >
            <IconFileUnknown
              size={72}
              stroke={1.5}
              color="var(--mantine-color-violet-6)"
            />
          </Center>

          <Title order={2} align="center">
            Page not found
          </Title>

          <Text c="dimmed" size="md" align="center">
            The page you are looking for doesn't exist, has been removed, or is
            temporarily unavailable.
          </Text>

          <Group spacing="sm" position="center" mt="md">
            <Button onClick={() => goTo("/home")}>Home</Button>
            <Button variant="outline" onClick={() => goBack()}>
              Go back
            </Button>
          </Group>

          <Text c="dimmed" size="xs" align="center">
            If this keeps happening, please contact support.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
