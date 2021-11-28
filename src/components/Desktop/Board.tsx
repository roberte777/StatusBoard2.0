import React from "react";
import { Grid, Paper } from "@mui/material";
import { boardColumn, GeneralStatus, sections, StatusBoard } from "statusBoard";
import Card from "@/components/Desktop/Card";
import GeneralCard from "./GeneralCard";

type rows = {
  component: Function;
  header: string;
  accessor: string;
};

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
  general: GeneralStatus;
  detailSections: sections[];
  generalSections: sections[];
  loading: boolean;
  sx?: any;
}) {
  return (
    <Grid container sx={sx} gap={2}>
      <Paper component={Grid} item xs={12} container>
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
        <div>loading...</div> //placeholder
      ) : (
        <>
          <GeneralCard data={general} detailSections={generalSections} />

          {cards.map((card: StatusBoard) => (
            <Card
              data={card}
              columns={columns}
              detailSections={detailSections}
            />
          ))}
        </>
      )}
    </Grid>
  );
}
