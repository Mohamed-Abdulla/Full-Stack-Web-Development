import { AppBar, styled } from "@mui/material";
import { red } from "@mui/material/colors";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  backgroundColor: red[600],
}));

export const Logo = styled("img")(({ theme }) => ({
  height: "60px",
  width: "160px",
  objectFit: "contain",
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));
