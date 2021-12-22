import React, { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Collapse,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseError } from "@firebase/util";
import router from "next/router";
type Alert = { type: string; message: string };

const SignupForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),

  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "300px",
  },
  "& .MuiButtonBase-root": {
    margin: theme.spacing(2),
  },
}));

const Form = () => {
  // create state variables for each input
  const [loading] = useAuthState(getAuth());
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCreatingUser(true);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser!, {
          displayName: `${firstName} ${middleName} ${lastName}`,
        }).then(() => {
          router.push("/");
          setCreatingUser(false);
        });
      })
      .catch((error: FirebaseError) => {
        setAlert({ type: "error", message: error.message });
        setCreatingUser(false);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };
  if (creatingUser || loading) {
    return <>loading...</>;
  }
  return (
    <SignupForm onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Middle Name"
        variant="filled"
        required
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
      <Typography>
        Already have an account?{" "}
        <Link href="/Auth/login">
          <a style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </a>
        </Link>
      </Typography>
      <Snackbar
        open={Object.keys(alert).length > 0}
        autoHideDuration={6000}
        onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === "clickaway") {
            return;
          }

          setAlert({} as Alert);
        }}
      >
        <Alert
          onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === "clickaway") {
              return;
            }

            setAlert({} as Alert);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {JSON.stringify(alert!.message)}
        </Alert>
      </Snackbar>
    </SignupForm>
  );
};
export default Form;
