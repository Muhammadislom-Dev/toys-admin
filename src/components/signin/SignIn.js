import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { parse } from "query-string";

const notify = (message, type) => {
  if (type === "success") {
    return toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000
    });
  } else if (type === "error") {
    return toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000
    });
  }
};

const theme = createTheme();

export function SignIn() {
  const { login } = useActions();
  const { redirectTo } = parse(window.location.search);
  const { token, error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      phone_number: data.get("phone_number"),
      password: data.get("password")
    });
  };

  React.useEffect(() => {
    if (error) notify(error, "error");
  }, [error]);

  if (token) {
    return (
      <Redirect to={redirectTo === "/" || !redirectTo ? "/" : redirectTo} />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone_number"
                label="phone_number"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
