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
    <Typography key={key} sx={{ width: "100%", display: "flex" }}>
      <div style={{ whiteSpace: "nowrap" }}>{header}: </div>
      <Input
        disableUnderline={readOnly}
        readOnly={readOnly}
        value={editedValue ?? value}
        multiline
        onChange={({ target }) => setEditedValue(target.value)}
        sx={{
          width: "100%",
          pt: 0.15,
          pb: 0,
          pl: 0.5,
        }}
      />
    </Typography>
  );
}
