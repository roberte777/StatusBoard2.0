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
import TextSection from "../TextSection";
import DateSection from "../DateSection";
import InitialsSection from "../InitialsSection";
import Loading from "../Loading";
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
  data,
  sx,
  dataLoading,
}: {
  data: StatusBoard;
  sx?: object;
  dataLoading: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [edits, setEdits] = useState<{ [key: string]: any }>({});
  const [editable, setEditable] = useState<boolean>(false);

  if (dataLoading) {
    return <Loading />;
  }
  return (
    <Paper sx={{ ...sx }} elevation={6}>
      <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
        <Typography variant="h6">
          {data.tailNumber}
          <IconButton
            onClick={() => setEditable(!editable)}
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
          {mappingArr.map((mapping, idx: number) => (
            <Grid container style={Object.assign({})} key={idx}>
              {mapping.map((row) => (
                <Grid item xs={12} key={row.accessor}>
                  <row.component
                    readOnly={!editable}
                    header={row.header}
                    value={data[row.accessor]}
                    editedValue={edits[row.accessor]}
                    setEditedValue={(value: typeof row.accessor) =>
                      setEdits((curr: any) => ({
                        ...curr,
                        [row.accessor]: value,
                      }))
                    }
                    key={row.accessor}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </SwipeableViews>
        {editable && (
          <Button
            onClick={async () => {
              const boardRef = doc(db, "Boards", data.id);
              await updateDoc(boardRef, edits).then().catch();
              setEditable((curr) => !curr);
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
