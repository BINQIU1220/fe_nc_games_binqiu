import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { userLogin } from "../utils/api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const navigate = useNavigate();
  const { setLoggedInUser, setUserAvatar, setIsLoggedIn, prevPath } =
    useContext(UserContext);

  const loggedIn = window.localStorage.getItem("isLoggedIn");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    userLogin(data.get("email"), data.get("password"))
      .then((res) => {
        setLoggedInUser(res.data[0]);
        setUserAvatar(res.data[1]);
        setIsLoggedIn(true);
        window.localStorage.setItem("username", res.data[0]);
        window.localStorage.setItem("avatar", res.data[1]);
        window.localStorage.setItem("isLoggedIn", true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loggedIn && prevPath !== "/") {
      navigate(prevPath);
    } else if (loggedIn) {
      navigate("/reviews/category_name/all");
    }
  }, [loggedIn, prevPath, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className="appbarClass"
          position="fixed"
          sx={{
            boxShadow: "none",
            background: "transparent",
            display: { xs: "none", md: "none", lg: "flex" },
            animation: "none",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button size="large" color="inherit" onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize="large" sx={{ mr: 1 }} /> Go back
              </Button>
            </Typography>
            <Button
              size="large"
              color="inherit"
              onClick={() => navigate(`/reviews/category_name/all`)}
            >
              <SportsEsportsIcon fontSize="large" sx={{ mr: 1 }} /> HOME
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate(`/signup`)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
