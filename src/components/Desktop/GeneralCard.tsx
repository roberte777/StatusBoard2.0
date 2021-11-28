import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
  Button,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { boardColumn, GeneralStatus, sections, StatusBoard } from "statusBoard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/provider";

type rows = {
  component: Function;
  header: string;
  accessor: string;
};

export default function DesktopCard({
  data,
  detailSections,
  sx,
}: {
  data: GeneralStatus;
  detailSections: sections[];
  sx?: any;
}) {
  const [boardOpen, setBoardOpen] = useState(true);
  const [edits, setEdits] = useState<any>({});
  const [editable, setEditable] = useState(false);
  // console.log(JSON.stringify(data));
  return (
    <Paper component={Grid} item xs={12} container>
      <Grid item xs={3} alignItems="center" p={1} sx={{}}>
        <Typography noWrap variant="h4">
          {" "}
          General Status
        </Typography>
      </Grid>
      <Grid item xs={2} alignItems="center" p={1} sx={{ display: "flex" }}>
        <Typography noWrap>{moment(data.fd).format("YYYY/MM/DD")}</Typography>
      </Grid>
      <Grid item xs={2} alignItems="center" p={1} sx={{ display: "flex" }}>
        <Typography noWrap>
          {moment(data.fuelFarmDate).format("YYYY/MM/DD")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        container
        alignItems="center"
        p={1}
        sx={{ display: "flex" }}
      >
        <Typography noWrap>{data.notes}</Typography>
      </Grid>
      <Grid
        item
        xs={1}
        container
        alignItems="center"
        p={1}
        sx={{ justifyContent: "end", display: "flex" }}
      >
        <IconButton
          onClick={() => {
            setBoardOpen((curr) => !curr);
          }}
          size="small"
        >
          {!boardOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>

        {/* <Typography noWrap variant={col.textVariant}>
            {col?.type == "date"
              ? moment(data[col.accessor]).format("YYYY/MM/DD")
              : data[col.accessor]}
          </Typography> */}
      </Grid>
      <Collapse
        in={boardOpen}
        unmountOnExit
        sx={{
          backgroundColor: "rgba(127,127, 127, .15)",
        }}
        component={Grid}
        //@ts-ignore
        item
        xs={12}
        p={1}
      >
        <Grid container>
          {detailSections.map((section) => (
            <Grid item xs={section.size}>
              <Stack spacing={editable ? 2 : 0}>
                {section.rows.map((row) => (
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
                ))}
              </Stack>
            </Grid>
          ))}
          {editable ? (
            <>
              <Button
                variant="contained"
                onClick={async () => {
                  const boardRef = doc(db, "General Status", data.id);
                  await updateDoc(boardRef, edits).then().catch();
                  setEditable((curr) => !curr);
                }}
              >
                Submit Changes
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  setEdits({});
                  setEditable((curr) => !curr);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditable(true)}>Edit</Button>
          )}
        </Grid>
      </Collapse>
    </Paper>
  );
}
