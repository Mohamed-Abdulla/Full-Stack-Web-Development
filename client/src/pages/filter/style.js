import { Paper, styled } from "@mui/material";

export const StyledFilter = styled(Paper)(({ theme }) => ({
  width: "250px",
  padding: 20,
}));
export const StyledCard = styled(Paper)(({ theme }) => ({
  padding: "25px 35px",
  height: 240,
  marginBottom: 30,
}));
export const Img = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  objectFit: "cover",
  borderRadius: 20,
}));
