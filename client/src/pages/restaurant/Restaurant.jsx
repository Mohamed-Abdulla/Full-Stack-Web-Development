import { Box, Button, Container, Grow, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import breakfast from "../../images/shutterstock_1154073754(1).png";
import lunch from "../../images/shutterstock_351721442@2x.png";
import "react-tabs/style/react-tabs.css";
import Checkout from "../../modals/Checkout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TabItem from "./Tabs/TabItem";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Restaurant = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  const { data, loading, error } = useFetch(`/res/find/${id}`);

  return (
    <Box sx={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <Grow in>
        <Container sx={{ padding: 6 }}>
          <Box position="relative">
            <Box height="350px !important">
              <Carousel showThumbs={false}>
                <img src={breakfast} style={{ height: "350px" }} />
                <img src={data?.thumb} style={{ height: "350px" }} />
                <img src={lunch} style={{ height: "350px" }} />
              </Carousel>
            </Box>

            <Button
              variant="contained"
              color="inherit"
              sx={{ position: "absolute", bottom: 40, right: 45, backgroundColor: "whitesmoke", color: "black" }}
            >
              Click ⬅️➡️ to see Image Gallery
            </Button>
          </Box>

          <Typography variant="h4" py={2} fontWeight="600" color="#192F60">
            {data?.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", marginX: 2 }}>
            <Button variant="contained" color="error" onClick={handleOpen}>
              Place Online Order
            </Button>
          </Box>

          <Checkout open={open} handleClose={handleClose} data={data} />

          <Box sx={{ width: "100%" }}>
            <TabItem id={id} />
          </Box>
        </Container>
      </Grow>
    </Box>
  );
};

export default Restaurant;
