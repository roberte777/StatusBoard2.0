import { Button } from "@mui/material";
import React from "react";

export default function FilledButton(props: any) {
  const { color = "primary" } = props;
  return (
    <Button {...props} variant="contained" color={color}>
      {props.children}
    </Button>
  );
}
