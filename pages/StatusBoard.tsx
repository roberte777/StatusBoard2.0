import { db } from "@/firebase/provider";
import { collection, query } from "@firebase/firestore";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import { StatusBoard, GeneralStatus } from "statusBoard";
import React, { useEffect, useState } from "react";
import MobileBoard from "@/components/MobileBoard";
import DesktopBoard from "@/components/DesktopBoard";
import {
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  TextSnippet as TextSnippetIcon,
} from "@mui/icons-material";

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
            <Grid item xs={3} sx={{ display: "flex" }}>
              Tail Number
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }}>
              <FlightTakeoffIcon fontSize="small" sx={{ mr: "5px" }} />
              Outbound
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }}>
              <FlightLandIcon fontSize="small" sx={{ mr: "5px" }} />
              Inbound
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }}>
              <TextSnippetIcon fontSize="small" sx={{ mr: "5px" }} />
              Notes
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Typography>Actions</Typography>
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
            dataLoading={dataLoading}
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
            dataLoading={dataLoading}
          />
        </Grid>
      ))}
    </Grid>
  );
}
StatusBoardPage.title = "Status Board";
StatusBoardPage.auth = true;
StatusBoardPage.roles = ["employee", "admin"];
