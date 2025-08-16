import { Box } from "@mantine/core";
import classes from "./smartCenter.module.css";

export default function SmartCenter({ children, style }) {
  return (
    <Box
      style={{ ...style }}
      className={classes.smartCenter}
    >
      {children}
    </Box>
  );
}
