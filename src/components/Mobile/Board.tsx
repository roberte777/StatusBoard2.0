import React from "react";
import { Grid } from "@mui/material";
import { boardColumn, GeneralStatus, sections, StatusBoard } from "statusBoard";
import Card from "@/components/Mobile/Card";
import GeneralCard from "./GeneralCard";
import Loading from "../Loading";

type rows = {
  component: Function;
  header: string;
  accessor: string;
};

export default function MobileBoard({
  cards,
  columns,
  general,
  detailSections,
  generalSections,
  loading,
  sx,
}: {
  cards: StatusBoard[];
  columns: boardColumn[];
  general: GeneralStatus;
  detailSections: sections[];
  generalSections: sections[];
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

          {cards.map((card: StatusBoard) => (
            <Card data={card} dataLoading={loading} />
          ))}
        </>
      )}
    </Grid>
  );
}
