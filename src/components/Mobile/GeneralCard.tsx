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
import { GeneralStatus, StatusBoard } from "statusBoard";
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
    header: "Fuel Delivery",
    accessor: "fd",
    component: DateSection,
  },
  {
    header: "Fuel Farm Date",
    accessor: "fuelFarmDate",
    component: DateSection,
  },
  {
    header: "Fuel Farm Initials",
    accessor: "fuelFarmInitials",
    component: InitialsSection,
  },
];

const boardMapping2: boardMapping[] = [
  {
    header: "Notes",
    accessor: "notes",
    component: TextSection,
  },
  {
    header: "VAC Comment",
    accessor: "vacComment",
    component: TextSection,
  },
];
const boardMapping3: boardMapping[] = [
  {
    header: "VAC Date",
    accessor: "vacDate",
    component: DateSection,
  },
  {
    header: "VAC Type",
    accessor: "vacType",
    component: TextSection,
  },
];
const mappingArr = [boardMapping1, boardMapping2, boardMapping3];

export default function PlaneBoard({
  data,
  sx,
  dataLoading,
}: {
  data: GeneralStatus;
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
          General Status
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
          {mappingArr.map((mapping) => (
            <Grid container style={Object.assign({})}>
              {mapping.map((row) => (
                <Grid item xs={12}>
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
              const boardRef = doc(db, "General Status", data.id);
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
