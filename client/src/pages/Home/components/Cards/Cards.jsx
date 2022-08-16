import { Box, Container, Grid, Grow, Typography } from "@mui/material";
import React from "react";
import CardItem from "./Card/Card";
import Breakfast from "../../../../assets/images/shutterstock_1154073754.png";
import Lunch from "../../../../assets/images/shutterstock_1130181932.png";
import Snacks from "../../../../assets/images/shutterstock_351721442.png";
import Dinner from "../../../../assets/images/shutterstock_476864884.png";
import Drinks from "../../../../assets/images/shutterstock_305270834.png";
import Nightlife from "../../../../assets/images/shutterstock_1304064250.png";

const Cards = () => {
  return (
    <Grow in>
      <Container>
        <Grid>
          <Grid item>
            <Typography variant="h3" component="h2" color="#192F60">
              Quick Search
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2" color="#8C96AB" marginTop={1}>
              Discover restaurants by type of meal
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", margin: "30px 0px" }}>
          <CardItem img={Breakfast} title="Breakfast" desc="Start your day with exclusive breakfast options" />
          <CardItem img={Lunch} title="Lunch" desc="Start your Second half with exclusive Lunch options" />
          <CardItem img={Snacks} title="Snacks" desc="Make your evening with exclusive Snacks options" />
          <CardItem img={Dinner} title="Dinner" desc="End your day with exclusive Dinner options" />
          <CardItem img={Drinks} title="Drinks" desc="Meet your friends with exclusive Drinks options" />
          <CardItem img={Nightlife} title="Night Life" desc="Enjoy your Night with exclusive Night Life options" />
        </Grid>
      </Container>
    </Grow>
  );
};

export default Cards;
