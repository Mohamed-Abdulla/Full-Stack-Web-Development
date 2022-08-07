import { Avatar, Button, Paper, styled } from "@mui/material";
import { red } from "@mui/material/colors";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: red[600],
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const StyledTextField = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
