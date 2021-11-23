import React, { useState } from "react";
import Link from "next/link";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase/provider";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";

const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),

  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "300px"
  },
  "& .MuiButtonBase-root": {
    margin: theme.spacing(2)
  }
}));

const Form = () => {
  // create state variables for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div>
        <Button type="submit" variant="contained" color="primary">
          Send Email
        </Button>
      </div>
      <Typography>
        Don't have an account?{" "}
        <Link href={"/Auth/signup"}>
          <a style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              SignUp
            </Button>
          </a>
        </Link>
      </Typography>
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
    </LoginForm>
  );
};
export default Form;
