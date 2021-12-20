import { db } from "@/firebase/provider";
import { collection, query } from "@firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { boardColumn, GeneralStatus, sections, StatusBoard } from "statusBoard";
import React, { useEffect, useState, useMemo } from "react";
import MobileBoard from "@/components/Mobile/Board";
import DesktopBoard from "@/components/Desktop/Board";
import {
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  TextSnippet as TextSnippetIcon,
} from "@mui/icons-material";
import DateSection from "@/components/DateSection";
import InitialsSection from "@/components/InitialsSection";
import TextSection from "@/components/TextSection";
import Loading from "@/components/Loading";

export default function StatusBoardPage() {
  const [statusBoards, setStatusBoards] = useState<StatusBoard[]>([]);
  const [generalStatus, setGeneralStatus] = useState<GeneralStatus>(
    {} as GeneralStatus
  );
  const [boardsLoading, setBoardsLoading] = useState<boolean>(true);
  const [generalLoading, setGeneralLoading] = useState<boolean>(true);
  useEffect(() => {
    setBoardsLoading(true);
    const q = query(collection(db, "Boards"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
      setBoardsLoading(false);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    setGeneralLoading(true);
    const general = doc(db, "General Status", "General Status");
    const unsub = onSnapshot(general, (doc) => {
      var data = doc.data()!;
      Object.keys(data).forEach((field: any) => {
        if (typeof data[field] === "object") {
          data[field] = data[field].toDate().toISOString();
        }
      });
      data = { ...data, id: doc.id };
      setGeneralStatus(data as GeneralStatus);
      setGeneralLoading(false);
    });
    return unsub;
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

  const desktopDetailSections: sections[] = useMemo(
    () => [
      {
        size: 3,
        rows: [
          {
            header: "Departure",
            accessor: "deptDate",
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
        ],
      },
      {
        size: 3,
        rows: [
          {
            header: "Departure",
            accessor: "deptDate2",
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
        ],
      },
      {
        size: 3,
        rows: [
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
        ],
      },
      {
        size: 3,
        rows: [
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
        ],
      },
    ],
    []
  ); //wip

  const generalSections: sections[] = useMemo(
    () => [
      {
        size: 4,
        rows: [
          {
            header: "Fuel Delivery",
            accessor: "fd",
            component: DateSection,
          },
          {
            header: "Fuel Farm Date",
            accessor: "fuelFarmDate",
            component: DateSection,
          },
          {
            header: "Fuel Farm Initials",
            accessor: "fuelFarmInitials",
            component: InitialsSection,
          },
        ],
      },
      {
        size: 4,
        rows: [
          {
            header: "Notes",
            accessor: "notes",
            component: TextSection,
          },
          {
            header: "VAC Comment",
            accessor: "vacComment",
            component: TextSection,
          },
        ],
      },
      {
        size: 4,
        rows: [
          {
            header: "VAC Date",
            accessor: "vacDate",
            component: DateSection,
          },
          {
            header: "VAC Type",
            accessor: "vacType",
            component: TextSection,
          },
        ],
      },
    ],
    []
  );

  if (boardsLoading || generalLoading) {
    return <Loading />;
  }

  return (
    <>
      <DesktopBoard
        cards={statusBoards}
        columns={desktopColumns}
        detailSections={desktopDetailSections}
        generalSections={generalSections}
        general={generalStatus}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        loading={generalLoading || boardsLoading}
      />
      {/* wip for mobile */}
      <MobileBoard
        cards={statusBoards}
        general={generalStatus}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
        }}
        loading={generalLoading || boardsLoading}
      />
    </>
  );
}
StatusBoardPage.title = "Status Board";
StatusBoardPage.auth = true;
StatusBoardPage.roles = ["employee"];
