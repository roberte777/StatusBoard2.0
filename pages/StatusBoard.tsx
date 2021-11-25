import { db } from "@/firebase/provider";
import { collection, query } from "@firebase/firestore";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { onSnapshot } from "firebase/firestore";
import { StatusBoard, GeneralStatus } from "statusBoard";
import React, { useEffect, useState } from "react";
import MobileBoard from "@/components/MobileBoard";
import DesktopBoard from "@/components/DesktopBoard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    headerName: "Tail Number",
    field: "tailNumber",
  },
  {
    headerName: "Departure Date",
    field: "deptDate",
  },
  {
    headerName: "Departure Time",
    field: "deptTime.seconds",
  },
  {
    headerName: "Crew",
    field: "crew",
  },
  {
    headerName: "Fuel",
    field: "fuel",
  },
  {
    headerName: "C/W",
    field: "cw",
  },
  {
    headerName: "Departure Date",
    field: "deptDate2",
  },
  {
    headerName: "Departure Time",
    field: "deptTime2.seconds",
  },
  {
    headerName: "Crew",
    field: "crew2",
  },
  {
    headerName: "Fuel",
    field: "fuel2",
  },
  {
    headerName: "C/W",
    field: "cw2",
  },
  {
    headerName: "Posted",
    field: "posted",
  },
  {
    headerName: "Fueled",
    field: "fueled",
  },
  {
    headerName: "Tires Mon & Fri",
    field: "tires",
  },
  {
    headerName: "Lav",
    field: "lav",
  },
  { headerName: "Routine Cleaning", field: "routine" },
  {
    headerName: "Detailed Cleaning",
    field: "detailed",
  },
  {
    headerName: "MEL Status",
    field: "MEL",
  },
  {
    headerName: "Notes",
    field: "notes",
  },
];

export default function StatusBoardPage() {
  const [statusBoards, setStatusBoards] = useState<StatusBoard[]>([]);
  useEffect(() => {
    const q = query(collection(db, "Boards"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let boards: StatusBoard[] = [];
      querySnapshot.forEach((doc) => {
        boards.push(doc.data() as StatusBoard);
      });

      setStatusBoards(boards.map((e) => ({ ...e, id: e.tailNumber })));
    });
    return unsubscribe;
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: "0px 16px",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              Tail Number
            </Grid>
            <Grid item xs={3}>
              Outbound
            </Grid>
            <Grid item xs={3}>
              Inbound
            </Grid>
            {/* <Grid item xs={3}>
              General Info
            </Grid> */}
          </Grid>
        </Paper>
      </Grid>
      {statusBoards.map((board: StatusBoard, idx: number) => (
        <Grid item xs={12} key={idx}>
          <MobileBoard
            board={board}
            key={`${board.tailNumber}sm`}
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          />
          <DesktopBoard
            board={board}
            key={board.tailNumber}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
  // <div style={{ height: "100vh" }}>
  //   <div style={{ display: "flex", height: "100%" }}>
  //     <div style={{ flexGrow: 1 }}>
  //       <DataGrid rows={statusBoards} columns={columns} />
  //     </div>
  //   </div>
  // </div>
}
StatusBoardPage.title = "Status Board";
