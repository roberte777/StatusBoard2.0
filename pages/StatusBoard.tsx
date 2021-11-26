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

export default function StatusBoardPage() {
  const [statusBoards, setStatusBoards] = useState<StatusBoard[]>([]);
  useEffect(() => {
    const q = query(collection(db, "Boards"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let boards: StatusBoard[] = [];
      querySnapshot.forEach((doc) => {
        boards.push({ ...doc.data(), id: doc.id } as StatusBoard);
      });

      setStatusBoards(boards);
    });
    return unsubscribe;
  }, []);
  return (
    <Grid container spacing={1}>
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
            <Grid item xs={2}>
              Outbound
            </Grid>
            <Grid item xs={2}>
              Inbound
            </Grid>
            <Grid item xs={3}>
              Notes
            </Grid>
            <Grid item xs={2}>
              Actions
            </Grid>
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
              borderRadius: "16px",
            }}
          />
          <DesktopBoard
            board={board}
            setStatusBoards={setStatusBoards}
            statusBoards={statusBoards}
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
}
StatusBoardPage.title = "Status Board";
