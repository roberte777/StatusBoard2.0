import { TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";

export default function TextSection({
  editMode,
  header,
  field,
  setStatusBoards,
  statusBoards,
}: {
  editMode: boolean;
  header: string;
  field: string;
  setStatusBoards: Dispatch<React.SetStateAction<StatusBoard[]>>;
  statusBoards: StatusBoard[];
}) {
  if (editMode) {
    return (
      <Typography>
        {/* {header}: <TextField onChange={() => setStatusBoards()} /> */}
      </Typography>
    );
  }
  return (
    <Typography>
      {header}: {field}
    </Typography>
  );
}
