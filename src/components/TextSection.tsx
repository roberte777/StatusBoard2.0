import { ListItem, TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";

export default function TextSection({
  editMode,
  header,
  accessor,
  currBoard,
  board,
  setCurrBoard,
}: {
  editMode: boolean;
  header: string;
  accessor: string;
  currBoard: StatusBoard;
  board: StatusBoard;
  setCurrBoard: Dispatch<React.SetStateAction<StatusBoard>>;
}) {
  if (editMode) {
    return (
      <Typography height="100%">
        <TextField
          label={header}
          onChange={(e) =>
            setCurrBoard({ ...currBoard, [accessor]: e.target.value })
          }
        />
      </Typography>
    );
  }
  return (
    <Typography>
      {header}: {board[accessor]}
    </Typography>
  );
}
