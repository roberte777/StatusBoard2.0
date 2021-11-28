import { Box, TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";

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
      <Box>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {header}:{" "}
        </Typography>
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
    );
  }
  return (
    <Typography>
      {header}:{" "}
      {board[accessor]
        ? moment(board[accessor] as unknown as Date).format("YYYY/MM/DD h:mm a")
        : "None"}
    </Typography>
  );
}
