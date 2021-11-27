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
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        {header}:
        <TextField
          value={currBoard[accessor]}
          onChange={(e) =>
            setCurrBoard({ ...currBoard, [accessor]: e.target.value })
          }
          sx={{ ml: "10px" }}
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
