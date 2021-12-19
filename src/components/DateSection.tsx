import { Input, Typography } from "@mui/material";
import React from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function DateSection({
  readOnly = true,
  header,
  value,
  setEditedValue,
  editedValue,
}: {
  readOnly?: boolean;
  header: string;
  setEditedValue: Function;
  value: any;
  editedValue?: any;
}) {
  return (
    <Typography>
      {header}:{" "}
      <DateTimePicker
        renderInput={(props: any) => (
          <Input
            endAdornment={!readOnly && props.InputProps.endAdornment}
            {...props}
            multiline
            disableUnderline={readOnly}
            readOnly={readOnly}
          />
        )}
        value={editedValue || new Date(value)}
        onChange={(val) => setEditedValue(val)}
      />
      {/* {value ? moment(value).format("YYYY/MM/DD h:mm a") : "None"} */}
    </Typography>
  );
}
