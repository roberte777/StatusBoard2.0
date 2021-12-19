import { Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FilledButton from "./FilledButton";

export default function InitialsSection({
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
