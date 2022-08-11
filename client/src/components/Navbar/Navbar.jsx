import { Button, Container } from "@mui/material";
import React from "react";
import logo from "../../images/zomato_white.png";
import { LoginButton, Profile, SignUpButton, StyledAvatar, StyledUsername } from "../Header/style";
import { Logo, StyledAppBar, ButtonContainer } from "./style";
import Auth from "../Auth/Auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <StyledAppBar position="sticky" top="10">
      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo src={logo} alt="" />
        </Link>
        <ButtonContainer>
          {user ? (
            <Profile>
              <StyledAvatar src={user?.picture} alt={user?.name}>
                {user?.name.charAt(0)}
              </StyledAvatar>
              <StyledUsername variant="h6" color="white">
                {user?.name}
              </StyledUsername>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Profile>
          ) : (
            <>
              {/* <LoginButton onClick={handleOpen}>Login</LoginButton> */}
              <Auth open={open} handleClose={handleClose} />
              <SignUpButton onClick={handleOpen} variant="outlined" color="warning">
                Sign-in / Sign-up
              </SignUpButton>
            </>
          )}
        </ButtonContainer>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
