import React, { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase/provider";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    try {
      // const resp = await (
      //   await fetch(`/api/auth/login`, {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: email,
      //       password: password
      //     })
      //   })
      // ).json();
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw { errorCode, errorMessage };
      });
    } catch (err) {
      // console.log(err);
    }
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
    </LoginForm>
  );
};
export default Form;
