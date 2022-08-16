import { Avatar, Button, Container, styled, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import bg from "../../../../assets/images/bg.png";

export const StyledContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url(${bg})`,
  height: "480px",
  width: "100%",
  marginTop: "50px",
  backgroundSize: "cover",
  objectFit: "cover",
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "20px 10px",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  color: "white",
  textTransform: "capitalize",
  fontSize: "18px",
}));
export const SignUpButton = styled(Button)(({ theme }) => ({
  color: "white",
  textTransform: "initial",
  border: "1px solid white",
  fontSize: "18px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

export const Logo = styled("img")(({ theme }) => ({
  height: "60px",
  width: "300px",
}));

export const Profile = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 25,
  justifyContent: "space-between",
}));
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[600],
}));
export const StyledUsername = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const SearchLocation = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#192F60",
  height: "auto",
  position: "absolute",
  zIndex: "1",
  width: "227px",
  [theme.breakpoints.down("sm")]: {
    width: "319px",
  },
}));
export const SearchContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#192F60",
  height: 250,
  overflowY: "scroll",
  position: "absolute",
  width: "480px",
  [theme.breakpoints.down("sm")]: {
    width: "319px",
  },
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8C96AB",
    borderRadius: "4px",
  },
}));
