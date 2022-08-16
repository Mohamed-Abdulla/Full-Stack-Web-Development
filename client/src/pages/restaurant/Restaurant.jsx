import { Box, Button, CircularProgress, Container, Grow, Rating, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Checkout from "./components/modals/Checkout";
import TabItem from "././components/Tabs/TabItem";
import Carousel from "./components/Carousel/Carousel";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./res.css";
import { useState } from "react";

const Restaurant = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [value, setValue] = useState(3);

  const { data, loading, error } = useFetch(`/res/find/${id}`);

  return (
    <Box sx={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      {!loading ? (
        <Grow in>
          <Container sx={{ padding: "32px" }}>
            <Box position="relative">
              <Box>
                <Carousel thumb={data?.thumb} />
              </Box>

              <Button
                variant="contained"
                color="inherit"
                sx={{
                  position: "absolute",
                  bottom: 40,
                  right: 45,
                  backgroundColor: "whitesmoke",
                  color: "black",
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                Click ⬅️➡️ to see Image Gallery
              </Button>
            </Box>

            <Typography variant="h4" fontSize={{ xs: "28px", sm: "34px" }} py={2} fontWeight="600" color="#192F60">
              {data?.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="contained" color="error" onClick={handleOpen}>
                Place Online Order
              </Button>
            </Box>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ marginBottom: 2 }}
            />

            <Checkout open={open} handleClose={handleClose} data={data} />

            <Box sx={{ width: "100%" }}>
              <TabItem id={id} />
            </Box>
          </Container>
        </Grow>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress color="error" />
        </Box>
      )}
    </Box>
  );
};

export default Restaurant;
