import { Paper, styled } from "@mui/material";

export const StyledFilter = styled(Paper)(({ theme }) => ({
  width: "25%",
  padding: 20,
  [theme.breakpoints.down("sm")]: {
    // display: "none",
    width: "90%",
  },
}));
export const StyledCard = styled(Paper)(({ theme }) => ({
  padding: "25px 35px",
  height: 290,
  marginBottom: 30,
  [theme.breakpoints.down("sm")]: {
    padding: "15px 25px",
    height: 230,
  },
}));
export const Img = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  objectFit: "cover",
  borderRadius: 20,
  [theme.breakpoints.down("sm")]: {
    width: 100,
    height: 100,
  },
}));
