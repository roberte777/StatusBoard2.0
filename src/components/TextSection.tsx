import { Typography, Input } from "@mui/material";
import React from "react";

export default function TextSection({
  readOnly = true,
  header,
  value,
  setEditedValue,
  key,
  editedValue,
}: {
  readOnly?: boolean;
  header: string;
  key: any;
  setEditedValue: Function;
  value: any;
  editedValue?: any;
}) {
  return (
    <Typography key={key}>
      {header}:{" "}
      <Input
        disableUnderline={readOnly}
        readOnly={readOnly}
        value={editedValue ?? value}
        multiline
        onChange={({ target }) => setEditedValue(target.value)}
      />
    </Typography>
  );
}
