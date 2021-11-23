import React from "react";
import AnimatedPlane from "@/components/animatedPlane";
import { Grid, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import "../styles/landing.module.css";

export default function index() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        backgroundColor: "#85b9dd",
        zIndex: -1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
        }}
      >
        <Typography align="center" fontSize={"2rem"} color="black">
          Aviation Status Board
        </Typography>
        <Typography align="center" color="black">
          I fly the stats so you can fly the planes
        </Typography>
        {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}> */}
        <Link href={"/Auth/resetPassword"}>
          <a style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Reset
            </Button>
          </a>
        </Link>
        {/* </Box> */}
      </Box>
      <div
        style={{
          position: "relative",
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <AnimatedPlane
          style={{
            position: "absolute",
            top: 0,
            zIndex: -1,
          }}
        />
      </div>
    </Box>
  );
}
index.title = "Home";
index.auth = true;
index.noPadding = true;
