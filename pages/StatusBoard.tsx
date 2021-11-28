import { db } from "@/firebase/provider";
import { collection, query } from "@firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { boardColumn, StatusBoard } from "statusBoard";
import React, { useEffect, useState, useMemo } from "react";
import MobileBoard from "@/components/MobileBoard";
import DesktopBoard from "@/components/Desktop/Board";
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
            data[field] = data[field].toDate().toISOString();
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

  const desktopColumns: boardColumn[] = useMemo(
    () => [
      {
        size: 3,
        header: "Tail Number",
        accessor: "tailNumber",
        textVariant: "h4",
      },
      {
        size: 2,
        header: (
          <>
            <FlightTakeoffIcon fontSize="small" sx={{ mr: "5px" }} />
            Outbound
          </>
        ),
        accessor: "deptDate",
        type: "date",
      },
      {
        size: 2,
        header: (
          <>
            <FlightLandIcon fontSize="small" sx={{ mr: "5px" }} />
            Inbound
          </>
        ),
        accessor: "deptDate2",
        type: "date",
      },
      {
        size: 4,
        header: (
          <>
            <TextSnippetIcon fontSize="small" sx={{ mr: "5px" }} />
            Notes
          </>
        ),
        accessor: "notes",
      },
      {
        size: 1,
        header: "Actions",
        accessor: "expand",
        justifyContent: "flex-end",
      },
    ],
    []
  );

  const desktopDetailSections = useMemo(() => [], []); //wip

  return (
    <>
      <DesktopBoard
        cards={statusBoards}
        // grr. why you red
        columns={desktopColumns}
        detailSections={desktopDetailSections}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        loading={dataLoading}
      />
      {/* wip for mobile */}
      {statusBoards.map((board) => (
        <MobileBoard
          board={board}
          key={`${board.tailNumber}sm`}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            borderRadius: "16px",
          }}
          dataLoading={dataLoading}
        />
      ))}
    </>
  );
}
StatusBoardPage.title = "Status Board";
// StatusBoardPage.auth = true;
// StatusBoardPage.roles = ["employee", "admin"];
