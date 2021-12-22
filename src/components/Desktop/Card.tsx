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
import { boardColumn, sections, StatusBoard } from "statusBoard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/provider";

export default function DesktopCard({
  data,
  columns,
  detailSections,
  sx,
}: {
  data: StatusBoard;
  columns: boardColumn[];
  detailSections: sections[];
  sx?: any;
}) {
  const [boardOpen, setBoardOpen] = useState(true);
  const [edits, setEdits] = useState<any>({});
  const [editable, setEditable] = useState(false);

  return (
    <Paper component={Grid} item xs={12} {...sx}>
      <Grid container sx={{ alignItems: "center", bgcolor: "secondary.main" }}>
        {columns.map((col: boardColumn, idx: any) => (
          <Grid
            item
            xs={col.size}
            key={`${idx}-${col.accessor}`}
            container
            alignItems="center"
            p={1}
            {...col}
          >
            {/* add edit mode in here to remove out of detail (no need for duplicate data)? idk */}
            {col.accessor === "expand" ? (
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
            ) : (
              <Typography noWrap variant={col.textVariant}>
                {col?.type == "date"
                  ? moment(data[col.accessor]).format("YYYY/MM/DD")
                  : data[col.accessor]}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
      <Collapse
        in={boardOpen}
        unmountOnExit
        component={Grid}
        //@ts-ignore
        item
        xs={12}
        p={1}
      >
        <Grid container spacing={editable ? 2 : 0}>
          {detailSections.map((section, idx: number) => (
            <Grid item xs={section.size} key={idx}>
              <Stack spacing={editable ? 2 : 1}>
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
