import React from "react";
import { Grid, Paper } from "@mui/material";
import { boardColumn, GeneralStatus, sections, StatusBoard } from "statusBoard";
import Card from "@/components/Desktop/Card";
import GeneralCard from "./GeneralCard";
import Loading from "../Loading";

export default function DesktopBoard({
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
  general: GeneralStatus | {};
  detailSections: sections[];
  generalSections: sections[];
  loading: boolean;
  sx?: any;
}) {
  return (
    <Grid container sx={sx} gap={2}>
      <GeneralCard
        data={general as GeneralStatus}
        detailSections={generalSections}
      />
      <Paper
        component={Grid}
        item
        xs={12}
        container
        sx={{ bgcolor: "secondary.main" }}
        className="column-header-section"
      >
        {columns.map((col: boardColumn) => (
          <Grid
            item
            xs={col.size}
            key={`header-${col.accessor}`}
            container
            p={1}
            {...col}
          >
            {col.header}
          </Grid>
        ))}
      </Paper>
      {loading ? (
        <Loading /> //placeholder
      ) : (
        <>
          {cards.map((card: StatusBoard, idx: number) => (
            <Card
              data={card}
              columns={columns}
              detailSections={detailSections}
              key={idx}
            />
          ))}
        </>
      )}
    </Grid>
  );
}
