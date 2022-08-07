import { Button, Paper, Grid, Typography, Container, Modal, Fade, Backdrop } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";

import Input from "./Input";
import { useContext, useState } from "react";
import { StyledPaper, StyledAvatar, StyledSubmitButton } from "./styles";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = ({ open, handleClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const createOrGetUser = async (user) => {
    // const decoded = await jwt_decode(user?.credential);
    // try {
    //   // dispatch({ type: AUTH, payload: decoded });
    //   console.log(decoded);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignup) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        handleClose(true);
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    } else {
      if (credentials.confirmPassword !== credentials.password) {
        credentials.confirmPassword.setCustomValidity("Passwords don't match");
      } else {
        const user = credentials;
        try {
          await axios.post("/auth/register", user);
          handleClose(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleChange = (e) => setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        marginTop: "10px",
      }}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container component="main" maxWidth="xs">
          <StyledPaper elevation={3}>
            <StyledAvatar>
              <LockOutlined />
            </StyledAvatar>
            <Typography sx={{ marginBottom: 2 }} variant="h5">
              {isSignup ? "Sign up" : "Sign in"}
            </Typography>
            <form
              sx={{
                width: "100%",
                marginTop: 3,
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                {isSignup && (
                  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                )}
              </Grid>
              <StyledSubmitButton type="submit" fullWidth variant="contained" color="error">
                {isSignup ? "Sign Up" : "Sign In"}
              </StyledSubmitButton>
              {/* <GoogleLogin
              onSuccess={(res) => {
                createOrGetUser(res);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              cookiePolicy="single_host_origin"
            /> */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button sx={{ marginTop: 1 }} onClick={switchMode}>
                    {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </StyledPaper>
        </Container>
      </Fade>
    </Modal>
  );
};

export default Auth;
