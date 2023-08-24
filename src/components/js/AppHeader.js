import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import logo from "../../logo.png";
import { actionTypes } from "./reducer";
import { useStateValue } from "./stateProvider";

function SideBox() {
  const [{}, dispatch] = useStateValue();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <h1 className="app_title">
        <img src={logo} alt="app logo" className="app_logo" />
      </h1>
      <Link to="/" style={{ textDecoration: "none" }}>
        Logout
        <IconButton aria-label="sing out" onClick={signOutHandler}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Link>
    </Box>
  );
}

export default SideBox;
