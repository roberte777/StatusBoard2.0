import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  Paper,
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

type boardMapping = {
  header: string;
  accessor: string;
  component: Function;
};

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));
// const boardMapping1: boardMapping[] = [
//   {
//     header: "Departure Date",
//     accessor: "deptDate",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Departure Time",
//     accessor: "deptTime.seconds",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Crew",
//     accessor: "crew",
//     component: <InitialsSection editMode={editMode} />,
//   },
//   {
//     header: "Fuel",
//     accessor: "fuel",
//     component: <TextSection editMode={editMode} />,
//   },
//   {
//     header: "C/W",
//     accessor: "cw",
//     component: <InitialsSection editMode={editMode} />,
//   },
// ];
// const boardMapping2: boardMapping[] = [
//   {
//     header: "Departure Date",
//     accessor: "deptDate2",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Departure Time",
//     accessor: "deptTime2.seconds",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Crew",
//     accessor: "crew2",
//     component: <InitialsSection editMode={editMode} />,
//   },
//   {
//     header: "Fuel",
//     accessor: "fuel2",
//     component: <TextSection editMode={editMode} />,
//   },
//   {
//     header: "C/W",
//     accessor: "cw2",
//     component: <InitialsSection editMode={editMode} />,
//   },
// ];
// const boardMapping3: boardMapping[] = [
//   {
//     header: "Posted",
//     accessor: "posted",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Fueled",
//     accessor: "fueled",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Tires Mon & Fri",
//     accessor: "tires",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Lav",
//     accessor: "lav",
//     component: <DateSection editMode={editMode} />,
//   },
// ];
// const boardMapping4: boardMapping[] = [
//   {
//     header: "Routine Cleaning",
//     accessor: "routine",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "Detailed Cleaning",
//     accessor: "detailed",
//     component: <DateSection editMode={editMode} />,
//   },
//   {
//     header: "MEL Status",
//     accessor: "MEL",
//     component: <TextSection editMode={editMode} />,
//   },
//   {
//     header: "Notes",
//     accessor: "notes",
//     component: <TextSection editMode={editMode} />,
//   },
// ];

const boardMapping1: boardMapping[] = [
  {
    header: "Departure Date",
    accessor: "deptDate",
    component: DateSection,
  },
  {
    header: "Departure Time",
    accessor: "deptTime.seconds",
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
    header: "Departure Date",
    accessor: "deptDate2",
    component: DateSection,
  },
  {
    header: "Departure Time",
    accessor: "deptTime2.seconds",
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
export default function PlaneBoard({
  board,
  setStatusBoards,
  statusBoards,
  sx,
}: {
  board: StatusBoard;
  setStatusBoards: Dispatch<React.SetStateAction<StatusBoard[]>>;
  statusBoards: StatusBoard[];
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
  return (
    <>
      <Accordion
        expanded={boardOpen}
        onChange={() => setBoardOpen(!boardOpen)}
        sx={{ ...sx, bgcolor: "secondary.light" }}
      >
        <AccordionSummary
          expandIcon={
            <>
              <IconButton onClick={() => setEditMode(!editMode)}>
                <EditIcon />
              </IconButton>
              <ExpandMoreIcon />
            </>
          }
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
                {board.deptDate}
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
                {board.deptDate2}
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
            <Grid item xs={2}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              ></Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Grid container>
          {mappingArr.map((mapping) => (
            <Grid item xs={12} sm={3}>
              <AccordionDetails>
                <Grid container>
                  {mapping.map((item) => (
                    <Grid item xs={12}>
                      <item.component
                        editMode={editMode}
                        header={item.header}
                        accessor={item.accessor}
                        board={currBoard}
                        setBoard={setCurrBoard}
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
