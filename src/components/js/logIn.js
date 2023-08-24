import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  auth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../../firebase";
import logo from "../../logo.png";
import { actionTypes } from "./reducer";
import { useStateValue } from "./stateProvider";

export default function LogIn() {
  const [{}, dispatch] = useStateValue();

  const logIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const logInGuest = () => {
    signInWithEmailAndPassword(auth, "guest@sandese.com", "sandeseguestlogin")
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box
      sx={{
        fontSize: "clamp(0.5rem, 0.5rem + 1vw, 1.2rem)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: "2em 3em",
        backgroundColor: "#f0f2fa",
        boxShadow: "0em 0em 1em 0.5em #d8deec",
        minWidth: 300,
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "5em",
          color: "#ed6d66",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="app logo" className="app_logo" />
      </Typography>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: "center", fontSize: "1.25em", py: 2 }}
      >
        Please log in to become user of sandese
      </Typography>
      <Box sx={{ width: "fit-content", display: "grid", gap: 1, m: 1 }}>
        <Button variant="contained" onClick={logIn}>
          {" "}
          Log In with google{" "}
        </Button>
        <Button variant="contained" onClick={logInGuest}>
          {" "}
          Log In as Guest{" "}
        </Button>
      </Box>
    </Box>
  );
}
