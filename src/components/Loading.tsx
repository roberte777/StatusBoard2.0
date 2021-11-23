import { CircularProgress, Container } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </Container>
  );
}
