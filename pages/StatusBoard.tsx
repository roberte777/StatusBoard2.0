import { db } from "@/firebase/provider";
import {
  collection,
  DocumentData,
  query,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import { Grid, Paper } from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
type StatusBoard = {
  MEL: string;
  crew: string;
  crew2: string;
  deptDate: string;
  deptDate2: string;
  deptTime: string;
  deptTime2: string;
  detailed: string;
  detailedInitials: string;
  fuel: string;
  fuel2: string;
  fueled: string;
  fueledInitials: string;
  lav: string;
  lavInitials: string;
  notes: string;
  posted: string;
  postedInitials: string;
  routine: string;
  routineInitials: string;
  tailNumber: string;
  tires: string;
  tiresInitials: string;
};
type GeneralStatus = {
  fd: string;
  fdt: Date;
  fuelFarmDate: Date;
  fuelFarmInitials: string;
  fuelFarmTime: Date;
  notes: string;
  vacComment: string;
  vacDate: string;
  vacTime: Date;
  vacType: string;
};
export default function StatusBoard() {
  const [statusBoards, setStatusBoards] = useState<StatusBoard[]>([]);
  useEffect(() => {
    const q = query(collection(db, "Boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const boards: StatusBoard[] = [];
      querySnapshot.forEach((doc) => {
        boards.push(doc.data() as StatusBoard);
      });
      setStatusBoards(boards);
    });
    return unsubscribe;
  }, []);
  return (
    <Grid container spacing={2}>
      {statusBoards.map((board: StatusBoard) => (
        <Grid item xs={12}>
          <Paper>
            {board.tailNumber}
            <Grid container>
              <Grid item>
                <Grid container>
                  <Grid item></Grid>
                </Grid>
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
StatusBoard.title = "Status Board";
