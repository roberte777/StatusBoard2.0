import {
  Accordion,
  AccordionDetails,
  Box,
  // AccordionSummary,
  Button,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import React, { Dispatch, useEffect, useState } from "react";
import { StatusBoard } from "statusBoard";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import TextSection from "./TextSection";
import DateSection from "./DateSection";
import InitialsSection from "./InitialsSection";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "@/firebase/provider";
import Loading from "./Loading";
import { getDateString } from "@/constants/dateFunctions";

type boardMapping = {
  header: string;
  accessor: string;
  component: Function;
};

const boardMapping1: boardMapping[] = [
  {
    header: "Departure",
    accessor: "deptDate",
    component: DateSection,
  },
  {
    header: "Crew",
    accessor: "crew",
    component: InitialsSection,
  },
  {
    header: "Fuel",
    accessor: "fuel",
    component: TextSection,
  },
  {
    header: "C/W",
    accessor: "cw",
    component: InitialsSection,
  },
];
const boardMapping2: boardMapping[] = [
  {
    header: "Departure",
    accessor: "deptDate2",
    component: DateSection,
  },
  {
    header: "Crew",
    accessor: "crew2",
    component: InitialsSection,
  },
  {
    header: "Fuel",
    accessor: "fuel2",
    component: TextSection,
  },
  {
    header: "C/W",
    accessor: "cw2",
    component: InitialsSection,
  },
];
const boardMapping3: boardMapping[] = [
  {
    header: "Posted",
    accessor: "posted",
    component: DateSection,
  },
  {
    header: "Fueled",
    accessor: "fueled",
    component: DateSection,
  },
  {
    header: "Tires Mon & Fri",
    accessor: "tires",
    component: DateSection,
  },
  {
    header: "Lav",
    accessor: "lav",
    component: DateSection,
  },
];
const boardMapping4: boardMapping[] = [
  {
    header: "Routine Cleaning",
    accessor: "routine",
    component: DateSection,
  },
  {
    header: "Detailed Cleaning",
    accessor: "detailed",
    component: DateSection,
  },
  {
    header: "MEL Status",
    accessor: "MEL",
    component: TextSection,
  },
  {
    header: "Notes",
    accessor: "notes",
    component: TextSection,
  },
];

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    // transform: "rotate(90deg)",
  },
}));

export default function PlaneBoard({
  board,
  sx,
  dataLoading,
}: {
  board: StatusBoard;
  dataLoading: boolean;
  sx?: object;
}) {
  const [boardOpen, setBoardOpen] = useState<boolean | undefined>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currBoard, setCurrBoard] = useState<StatusBoard>(board);

  const mappingArr = [
    boardMapping1,
    boardMapping2,
    boardMapping3,
    boardMapping4,
  ];
  useEffect(() => {
    setCurrBoard(board);
  }, [board]);
  if (dataLoading) {
    return <Loading />;
  }
  return (
    <>
      <Accordion
        expanded={boardOpen}
        // onChange={() => setBoardOpen(!boardOpen)}
        sx={{ ...sx, bgcolor: "secondary.light" }}
      >
        <AccordionSummary
          // onClick={() => setBoardOpen(!boardOpen)}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h4" align="left">
                {board.tailNumber}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {board.deptDate ? getDateString(board.deptDate) : "None"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {board.deptDate2 ? getDateString(board.deptDate2) : "None"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography noWrap textOverflow="ellipsis">
                {board.notes}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <IconButton
                  onClick={(e) => {
                    setEditMode(!editMode);
                  }}
                  sx={{ float: "right" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    setBoardOpen(!boardOpen);
                  }}
                  sx={{ float: "right" }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Grid container>
          {mappingArr.map((mapping, idx) => (
            <Grid item sm={editMode ? 6 : 3} key={idx}>
              <AccordionDetails key={JSON.stringify(mapping)}>
                <Grid
                  container
                  key={JSON.stringify(mapping) + idx}
                  spacing={1}
                  sx={{ p: 1 }}
                >
                  {mapping.map((item, idx) => (
                    <Grid item xs={12} key={JSON.stringify(item) + idx}>
                      <item.component
                        editMode={editMode}
                        header={item.header}
                        accessor={item.accessor}
                        currBoard={currBoard}
                        board={board}
                        setCurrBoard={setCurrBoard}
                        key={item.accessor}
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Grid>
          ))}
        </Grid>
        {editMode && (
          <Button
            onClick={async () => {
              const boardRef = doc(db, "Boards", board.id);

              // Set the "capital" field of the city 'DC'
              await updateDoc(boardRef, currBoard);
              setEditMode(false);
            }}
          >
            Save
          </Button>
        )}
      </Accordion>
    </>
  );
}
