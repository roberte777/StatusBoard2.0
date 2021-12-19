import React, { useState } from "react";
import Link from "next/link";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCreatingUser(true);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser!, {
          displayName: `${firstName} ${middleName} ${lastName}`,
        }).then(() => setCreatingUser(false));
      })
      .catch((error) => {
        console.error(error);
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
    </SignupForm>
  );
};
export default Form;
