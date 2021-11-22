import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

export default function filledButton(props: any) {
  const { color = "primary" } = props;
  return (
    <Button {...props} variant="contained" color={color}>
      {props.children}
    </Button>
  );
}
