import React from "react";
import { Grid } from "@mui/material";
import { GeneralStatus, StatusBoard } from "statusBoard";
import Card from "@/components/Mobile/Card";
import GeneralCard from "./GeneralCard";
import Loading from "../Loading";

export default function MobileBoard({
  cards,
  general,
  loading,
  sx,
}: {
  cards: StatusBoard[];
  general: GeneralStatus;
  loading: boolean;
  sx?: any;
}) {
  return (
    <Grid container sx={sx} gap={2}>
      {loading ? (
        <Loading /> //placeholder
      ) : (
        <>
          <GeneralCard data={general} dataLoading={loading} />

          {cards.map((card: StatusBoard, idx: number) => (
            <Card data={card} dataLoading={loading} key={idx} />
          ))}
        </>
      )}
    </Grid>
  );
}
