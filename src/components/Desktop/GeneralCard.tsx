import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Button,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { GeneralStatus, sections } from "statusBoard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/provider";

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
    <Grid item xs={12}>
      <Paper {...sx}>
        <Grid
          container
          sx={{ bgcolor: "secondary.main", alignItems: "center" }}
        >
          <Grid item xs={3} alignItems="center" p={1}>
            <Typography noWrap variant="h4">
              {" "}
              General Status
            </Typography>
          </Grid>
          <Grid item xs={2} alignItems="center" p={1} sx={{ display: "flex" }}>
            <Typography noWrap>
              {moment(data.fd).format("YYYY/MM/DD")}
            </Typography>
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
            <>
              {!editable && (
                <IconButton onClick={() => setEditable(true)} size="small">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setBoardOpen((curr) => !curr);
                }}
                size="small"
              >
                {!boardOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </>
          </Grid>
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
          <Grid container spacing={2}>
            {detailSections.map((section, idx: number) => (
              <Grid item xs={section.size} key={idx}>
                <Stack spacing={2}>
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
            {editable && (
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "flex-end",
                  display: "flex",
                  "& button": { m: 2 },
                }}
              >
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
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Paper>
    </Grid>
  );
}
