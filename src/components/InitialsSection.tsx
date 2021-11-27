import { Box, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";
import FilledButton from "./FilledButton";

export default function InitialsSection({
  editMode,
  header,
  accessor,
  currBoard,
  setCurrBoard,
  board,
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
      <Box sx={{ height: "100%" }}>
        <Typography>
          {header}: {currBoard[accessor]}
        </Typography>
        <FilledButton>Sign</FilledButton>
      </Box>
    );
  }
  return (
    <Typography>
      {header}: {board[accessor]}
    </Typography>
  );
}
