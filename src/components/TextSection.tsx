import { ListItem, TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";

export default function TextSection({
  editMode,
  header,
  accessor,
  //   field,
  board,
  setBoard,
}: {
  editMode: boolean;
  header: string;
  //   field: string;
  accessor: string;
  board: StatusBoard;
  setBoard: Dispatch<React.SetStateAction<StatusBoard>>;
  //   setStatusBoards: Dispatch<React.SetStateAction<StatusBoard[]>>;
  //   statusBoards: StatusBoard[];
}) {
  if (editMode) {
    return (
      <Typography>
        {header}:{" "}
        <TextField
          onChange={(e) => setBoard({ ...board, [accessor]: e.target.value })}
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
