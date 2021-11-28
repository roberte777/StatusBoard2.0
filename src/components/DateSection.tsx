import { Box, Input, TextField, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";

export default function DateSection({
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
        value={new Date(value)}
        onChange={(val) => console.log(val)}
      />
      {/* {value ? moment(value).format("YYYY/MM/DD h:mm a") : "None"} */}
    </Typography>
  );
}
