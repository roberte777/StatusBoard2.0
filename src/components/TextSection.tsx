import { Typography } from "@mui/material";
import React from "react";
import { StatusBoard } from "statusBoard";

export default function TextSection({
  editMode,
  header,
  accessor,
  board,
}: {
  editMode: boolean;
  header: string;
  accessor: string;
  board: StatusBoard;
}) {
  if (editMode) {
    return <Typography></Typography>;
  }
  return (
    <Typography>
      {header}: {board[accessor]}
    </Typography>
  );
}
