import React from "react";
import { Grid, Paper } from "@mui/material";
import { boardColumn } from "statusBoard";
import Card from "@/components/Desktop/Card";

type sections = {
  size: number;
  rows: rows[];
  component: Function;
};
type rows = {
  component: Function;
  header: string;
  accessor: string;
};

export default function DesktopBoard({
  cards,
  columns,
  detailSections,
  loading,
  sx,
}: {
  cards: object[];
  columns: boardColumn[];
  detailSections: sections[];
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
        cards.map((card: any, idx: any) => (
          <Card data={card} columns={columns} detailSections={detailSections} />
        ))
      )}
    </Grid>
  );
}
