import { Button, Container, Group, Text } from "@mantine/core";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <div className={classes.background}>
      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title} style={{ color: "white" }}>
            Your{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              Next Match
            </Text>{" "}
            Awaits!
          </h1>

          <Text className={classes.description} c="white">
            Whether you're organizing or joining, this is your hub for sports.
            Discover new matches, make friends, and enjoy the thrill of
            competition.
          </Text>

          <Group className={classes.controls}>
            <Button
              component="a"
              href="#"
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              Create Match
            </Button>

            <Button
              component="a"
              href="#"
              size="xl"
              variant="default"
              className={classes.control}
            >
              Join Match
            </Button>
          </Group>
        </Container>
      </div>
    </div>
  );
}
