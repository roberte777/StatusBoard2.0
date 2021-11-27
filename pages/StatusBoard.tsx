import { db } from "@/firebase/provider";
import { collection, query, Timestamp } from "@firebase/firestore";
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
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  useEffect(() => {
    const q = query(collection(db, "Boards"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setDataLoading(true);
      let boards: StatusBoard[] = [];
      querySnapshot.forEach(async (doc) => {
        var data = doc.data();
        Object.keys(data).forEach((field: any) => {
          if (typeof data[field] === "object") {
            data[field] = data[field].toDate();
          }
        });
        boards.push({
          ...data,
          id: doc.id,
        } as StatusBoard);
      });

      setStatusBoards(boards);
      setDataLoading(false);
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
          {/* <MobileBoard
            board={board}
            key={`${board.tailNumber}sm`}
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              borderRadius: "16px",
            }}
          /> */}
          <DesktopBoard
            board={board}
            key={board.tailNumber}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            dataLoading={dataLoading}
          />
        </Grid>
      ))}
    </Grid>
  );
}
StatusBoardPage.title = "Status Board";
