import { Box, Button, CircularProgress, Container, Grow, Rating, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import breakfast from "../../assets/images/shutterstock_1154073754(1).png";
import lunch from "../../assets/images/shutterstock_351721442@2x.png";
import "react-tabs/style/react-tabs.css";
import Checkout from "./components/modals/Checkout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TabItem from "././components/Tabs/TabItem";
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
                <Carousel showThumbs={false} dynamicHeight={true}>
                  <img src={breakfast} className="cImg" />
                  <img src={data?.thumb} className="cImg" />
                  <img src={lunch} className="cImg" />
                </Carousel>
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
