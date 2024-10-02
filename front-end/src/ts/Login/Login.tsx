import React, { useEffect, useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);

  const login = () => {
    return (
      <Box
        component="form"
        sx={{
          backgroundColor: "#343434",
          width: "16rem",
          position: "relative",
          top: "-10px",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          borderRadius: "5px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        <div style={{ marginBottom: "1rem", userSelect: "none" }}>
          Login or Sign up
        </div>
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          error={userError}
          className="custom-textfield"
          sx={{ marginBottom: "1rem" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          error={passError}
          className="custom-textfield"
          sx={{ marginBottom: "1rem" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => attemptSignup()}
          >
            sign up
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => attemptLogin()}
          >
            login
          </Button>
        </Box>
      </Box>
    );
  };

  const loggedin = () => {
    return (
      <div
        style={{
          backgroundColor: "#343434",
          width: "16rem",
          position: "relative",
          top: "-10px",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          borderRadius: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        hello user!
      </div>
    );
  };

  const attemptLogin = () => {
    if (username === "") {
      setUserError(true);
    }
    if (password === "") {
      setPassError(true);
    }

    if (username === "" || password === "") {
      return;
    }

    setUserError(false);
    setPassError(false);
  };

  const attemptSignup = () => {
    if (username === "") {
      setUserError(true);
    }
    if (password === "") {
      setPassError(true);
    }

    if (username === "" || password === "") {
      return;
    }

    setUserError(false);
    setPassError(false);
  };

  useEffect(() => {
  }, [showLogin, username, password, userError, passError]);

  return (
    <div>
      <div
        className="user-icon"
        onMouseEnter={() => setShowLogin(!showLogin)}
        onMouseLeave={() => setShowLogin(!showLogin)}
      >
        <svg
          className="svg-icon"
          style={{
            width: "1em",
            height: "1em",
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden",
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
        </svg>
        <div className="login-container">
        {showLogin ? (
          loggedIn ? loggedin() : login()
        ) : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
