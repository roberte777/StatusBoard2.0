import React from "react";
import AnimatedPlane from "@/components/animatedPlane";
import { Grid, Typography } from "@mui/material";
export default function index() {
  return (
    <>
      <Typography>Aviation Status Board</Typography>

      <div style={{ height: "200px", width: "100%" }}>
        <AnimatedPlane />
      </div>
    </>
  );
}
index.title = "Home";
index.auth = true;
