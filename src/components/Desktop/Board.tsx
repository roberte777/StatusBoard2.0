import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

//make extensions later?
type boardColumns = {
  size: number;
  header: string;
  accessor: string;
  component?: Function;
  type?: string;
  textVariant?: string;
};
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

export default function DesktopBoard({
  cards,
  columns,
  detailSections,
  loading,
  sx,
}: {
  cards: object[];
  columns: boardColumns[];
  detailSections: sections[];
  loading: boolean;
  sx?: any;
}) {
  const [boardOpen, setBoardOpen] = useState(false);

  return (
    <Grid container sx={sx} gap={2}>
      <Paper component={Grid} item xs={12} container>
        {columns.map((col: boardColumns) => (
          <Grid
            item
            xs={col.size}
            key={`header-${col.accessor}`}
            container
            p={1}
            {...col}
          >
            {col.header}
          </Grid>
        ))}
      </Paper>
      {/* moving into Card comp later. and yes i know they all expand since its one state. deal with it */}
      {cards.map((card: any, idx: any) => (
        <Paper component={Grid} item xs={12} container>
          {columns.map((col: boardColumns) => (
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
                    ? moment(card[col.accessor]).format("YYYY/MM/DD")
                    : card[col.accessor]}
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
            //i swear.... why you red...
            item
            xs={12}
            p={1}
          >
            {detailSections.map((section) => (
              <Grid item xs={section.size}>
                {section.rows.map((row) => (
                  <row.component />
                ))}
              </Grid>
            ))}
          </Collapse>
        </Paper>
      ))}
    </Grid>
  );
}
