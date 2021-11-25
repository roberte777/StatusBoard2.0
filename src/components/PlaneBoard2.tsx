import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { StatusBoard } from "statusBoard";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

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

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

const mappingArr = [boardMapping1, boardMapping2, boardMapping3, boardMapping4];

export default function PlaneBoard({ board }: { board: StatusBoard }) {
  const [boardOpen, setBoardOpen] = useState<boolean | undefined>(true);
  return (
    <>
      <Accordion
        expanded={boardOpen}
        onChange={() => setBoardOpen(!boardOpen)}
        sx={{ bgcolor: "secondary.light" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h4" align="left">
                {board.tailNumber}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {board.deptDate}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {board.deptDate2}
              </Typography>
            </Grid>
            {/* <Grid item xs={3}></Grid> */}
          </Grid>
        </AccordionSummary>
        <Grid container>
          {mappingArr.map((mapping) => (
            <Grid item xs={12} md={3}>
              <AccordionDetails>
                <Grid container>
                  {mapping.map((item) => (
                    <Grid item xs={12}>
                      {console.log(item)}
                      <Typography>
                        {item.header}: {board[item.accessor]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Grid>
          ))}
        </Grid>
      </Accordion>
    </>
  );
}
