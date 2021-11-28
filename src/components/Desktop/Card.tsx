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
import { boardColumn, StatusBoard } from "statusBoard";

type sections = {
  size: number;
  rows: rows[];
  component: Function;
};
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
  data: object;
  columns: boardColumn[];
  detailSections: sections[];
  sx?: any;
}) {
  const [boardOpen, setBoardOpen] = useState(false);
  const [edits, setEdits] = useState({});
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
        >
          {/* add edit mode in here to remove out of detail (no need for duplicate data)? idk */}
          {col.accessor === "expand" ? (
            <IconButton
              onClick={() => {
                setBoardOpen((curr) => !curr);
              }}
              size="small"
            >
              {!boardOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
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
              <Stack>
                {section.rows.map((row) => (
                  <row.component
                    readOnly={!editable}
                    header={row.header}
                    value={data[row.accessor]}
                    editedValue={edits[row.accessor]}
                    setEditedValue={(value) =>
                      setEdits((curr) => ({ ...curr, [row.accessor]: value }))
                    }
                    key={row.accessor}
                  />
                ))}
              </Stack>
            </Grid>
          ))}
          <Button
            variant="contained"
            onClick={() => setEditable((curr) => !curr)}
          >
            testing for edit
          </Button>
        </Grid>
      </Collapse>
    </Paper>
  );
}
