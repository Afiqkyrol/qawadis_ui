"use client";

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { userIdleSignout } from "../../hook/userIdleSignout";
import { Container, Grid } from "@mantine/core";
import { BadgeCard } from "../../mantine/template/BadgeCard/BadgeCard";

export default function HomeClient() {
  // userIdleSignout(3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, []);

  return (
    <Container fluid h="100%">
      <Grid>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
        <Grid.Col span="content">
          <BadgeCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
