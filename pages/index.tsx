import React from "react";
import AnimatedPlane from "@/components/animatedPlane";
import { Grid, Typography } from "@mui/material";
export default function index() {
  return (
    <div
      style={{
        position: "relative",
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography align="center" fontSize={"2rem"} color="blue">
        Aviation Status Board
      </Typography>

      <AnimatedPlane
        style={{
          position: "absolute",
          top: 0,
          zIndex: -1
          // backgroundColor:
          //   "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
        }}
      />
    </div>
  );
}
index.title = "Home";
index.auth = true;
