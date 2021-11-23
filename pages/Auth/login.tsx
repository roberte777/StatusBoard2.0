import React, { useState } from "react";
import Link from "next/link";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase/provider";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
const LoginForm = styled("form")(({ theme }) => ({
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoggingIn(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          throw { errorCode, errorMessage };
        })
        .then(() => {
          setLoggingIn(false);
          router.back();
        });
    } catch (err) {
      // console.log(err);
    }
  };
  if (loading || loggingIn) {
    return <Loading />;
  }

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
          Login
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
        Forgot Password?
        <Link href={"/Auth/resetPassword"}>
          <a style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Reset
            </Button>
          </a>
        </Link>
      </Typography>
    </LoginForm>
  );
};
export default Form;
