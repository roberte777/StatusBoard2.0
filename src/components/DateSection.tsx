import { Box, TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { getDateTimeString } from "@/constants/dateFunctions";

export default function DateSection({
  editMode,
  header,
  accessor,
  setCurrBoard,
  currBoard,
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
      <Typography height="100%">
        {header}:
        <Box sx={{ m: "10px 0" }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="test"
            value={new Date(currBoard[accessor])}
            onChange={(newValue) => {
              setCurrBoard({
                ...currBoard,
                [accessor]: newValue,
              } as StatusBoard);
            }}
          />
        </Box>
      </Typography>
    );
  }
  return (
    <Typography>
      {header}:{" "}
      {board[accessor]
        ? getDateTimeString(board[accessor] as unknown as Date)
        : "None"}
    </Typography>
  );
}
