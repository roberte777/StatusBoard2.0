import { Box, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { Dispatch } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  const [user, loading] = useAuthState(getAuth());
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <Typography>
      {header}: {editedValue || value}
      {!readOnly && (
        <FilledButton
          onClick={() => {
            if (user) {
              var initials = user?.displayName!.match(/\b(\w)/g)?.join("");
              setEditedValue(initials);
            }
          }}
          sx={{ ml: 1 }}
        >
          Sign
        </FilledButton>
      )}
    </Typography>
  );
}
