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
  columns,
  detailSections,
  sx,
}: {
  data: StatusBoard | GeneralStatus;
  columns: boardColumn[];
  detailSections: sections[];
  sx?: any;
}) {
  const [boardOpen, setBoardOpen] = useState(true);
  const [edits, setEdits] = useState<any>({});
  const [editable, setEditable] = useState(false);

  return (
    <Paper component={Grid} item xs={12} container>
      {columns.map((col: boardColumn, idx: any) => (
        <Grid
          item
          xs={col.size}
          key={`${idx}-${col.accessor}`}
          container
          alignItems="center"
          p={1}
          {...col}
          sx={{ bgcolor: "secondary.main" }}
        >
          {/* add edit mode in here to remove out of detail (no need for duplicate data)? idk */}
          {col.accessor === "expand" ? (
            <>
              {!editable && (
                <IconButton onClick={() => setEditable(true)}>
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
          ) : (
            // grr. why you red
            <Typography noWrap variant={col.textVariant}>
              {col?.type == "date"
                ? moment(data[col.accessor]).format("YYYY/MM/DD")
                : data[col.accessor]}
            </Typography>
          )}
        </Grid>
      ))}
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
          {editable && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                "& button": { m: 2 },
              }}
            >
              <Button
                variant="contained"
                onClick={async () => {
                  const boardRef = doc(db, "Boards", data.id);
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
  );
}
