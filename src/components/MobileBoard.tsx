import {
  Box,
  Divider,
  Grid,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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

export default function PlaneBoard({
  board,
  sx,
}: {
  board: StatusBoard;
  sx?: object;
}) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Paper sx={{ ...sx }} elevation={6}>
      <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
        <Typography variant="h6">{board.tailNumber}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ pl: 1, pr: 1 }}>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={(step) => setActiveStep(step)}
        >
          {mappingArr.map((mapping) => (
            <Grid container style={Object.assign({})}>
              {mapping.map((item) => (
                <Grid item xs={12}>
                  <Typography>
                    {item.header}: {board[item.accessor]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={mappingArr.length}
          position="static"
          activeStep={activeStep}
          sx={{ justifyContent: "center", bgcolor: "transparent" }}
        />
      </Box>
    </Paper>
  );
}
