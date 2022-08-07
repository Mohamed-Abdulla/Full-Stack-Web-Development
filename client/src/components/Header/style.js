import { Avatar, Button, Container, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import bg from "../../images/bg.png";

export const StyledContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url(${bg})`,
  // backgroundImage: `url(${bg})`,
  height: "480px",
  width: "100%",
  marginTop: "50px",
  backgroundSize: "cover",
  objectFit: "cover",
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "20px 30px",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  color: "white",
  textTransform: "capitalize",
  fontSize: "18px",
}));
export const SignUpButton = styled(Button)(({ theme }) => ({
  color: "white",
  textTransform: "initial",
  fontSize: "18px",
  border: "1px solid white",
  margin: "0 15px",
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
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));
export const StyledUsername = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const SearchLocation = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#192F60",
  height: "auto",
  position: "absolute",
  width: "227px",
}));
export const SearchContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#192F60",
  height: 250,
  overflowY: "scroll",
  position: "absolute",
  width: "478px",
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8C96AB",
    borderRadius: "4px",
  },
}));
