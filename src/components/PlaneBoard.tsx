import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { StatusBoard } from "statusBoard";
import SwipeableViews from "react-swipeable-views";

type boardMapping = {
  header: string;
  accessor: string;
};

const boardMapping1: boardMapping[] = [
  {
    header: "Departure Date",
    accessor: "deptDate",
  },
  {
    header: "Departure Time",
    accessor: "deptTime.seconds",
  },
  {
    header: "Crew",
    accessor: "crew",
  },
  {
    header: "Fuel",
    accessor: "fuel",
  },
  {
    header: "C/W",
    accessor: "cw",
  },
];
const boardMapping2: boardMapping[] = [
  {
    header: "Departure Date",
    accessor: "deptDate2",
  },
  {
    header: "Departure Time",
    accessor: "deptTime2.seconds",
  },
  {
    header: "Crew",
    accessor: "crew2",
  },
  {
    header: "Fuel",
    accessor: "fuel2",
  },
  {
    header: "C/W",
    accessor: "cw2",
  },
];
const boardMapping3: boardMapping[] = [
  {
    header: "Posted",
    accessor: "posted",
  },
  {
    header: "Fueled",
    accessor: "fueled",
  },
  {
    header: "Tires Mon & Fri",
    accessor: "tires",
  },
  {
    header: "Lav",
    accessor: "lav",
  },
];
const boardMapping4: boardMapping[] = [
  { header: "Routine Cleaning", accessor: "routine" },
  {
    header: "Detailed Cleaning",
    accessor: "detailed",
  },
  {
    header: "MEL Status",
    accessor: "MEL",
  },
  {
    header: "Notes",
    accessor: "notes",
  },
];

const mappingArr = [boardMapping1, boardMapping2, boardMapping3, boardMapping4];

export default function PlaneBoard({ board }: { board: StatusBoard }) {
  return (
    <Paper sx={{ p: 2 }} elevation={6}>
      <Typography variant="h4" align="center">
        {board.tailNumber}
      </Typography>
      <SwipeableViews>
        {mappingArr.map((mapping) => (
          <Grid container style={Object.assign({})}>
            {mapping.map((item) => (
              <Grid item xs={12}>
                {console.log(item)}
                <Typography>
                  {item.header}: {board[item.accessor]}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </SwipeableViews>
    </Paper>
  );
}
