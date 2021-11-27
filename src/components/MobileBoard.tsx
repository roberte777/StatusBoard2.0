import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { StatusBoard } from "statusBoard";
import SwipeableViews from "react-swipeable-views";
import TextSection from "./TextSection";
import DateSection from "./DateSection";
import InitialsSection from "./InitialsSection";
import Loading from "./Loading";
import { doc } from "@firebase/firestore";
import { db } from "@/firebase/provider";
import { updateDoc } from "firebase/firestore";

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

const mappingArr = [boardMapping1, boardMapping2, boardMapping3, boardMapping4];

export default function PlaneBoard({
  board,
  sx,
  dataLoading,
}: {
  board: StatusBoard;
  sx?: object;
  dataLoading: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currBoard, setCurrBoard] = useState<StatusBoard>(board);

  if (dataLoading) {
    return <Loading />;
  }
  return (
    <Paper sx={{ ...sx }} elevation={6}>
      <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
        <Typography variant="h6">
          {board.tailNumber}{" "}
          <IconButton
            onClick={() => setEditMode(!editMode)}
            sx={{ float: "right" }}
          >
            <EditIcon />
          </IconButton>
        </Typography>
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
          ))}
        </SwipeableViews>
        {editMode && (
          <Button
            onClick={async () => {
              const boardRef = doc(db, "Boards", board.id);
              await updateDoc(boardRef, currBoard);
              setEditMode(false);
            }}
          >
            Save
          </Button>
        )}
        <MobileStepper
          steps={mappingArr.length}
          position="static"
          activeStep={activeStep}
          sx={{ justifyContent: "center", bgcolor: "transparent" }}
          backButton={<></>}
          nextButton={<></>}
        />
      </Box>
    </Paper>
  );
}
