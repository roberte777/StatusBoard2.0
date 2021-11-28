import { Box, Typography } from "@mui/material";
import React, { Dispatch } from "react";
import { StatusBoard } from "statusBoard";
import FilledButton from "./FilledButton";

export default function InitialsSection({
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
      {header}: {value}
      {!readOnly && <FilledButton>Sign</FilledButton>}
    </Typography>
  );
}
