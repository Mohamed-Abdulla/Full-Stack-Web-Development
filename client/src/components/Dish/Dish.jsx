import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

const Dish = ({ item, handleQuantity, quantity }) => {
  return (
    <Box display="flex" flexDirection="column" my={1} width="400px">
      <Typography variant="body1" fontWeight="500" color="#000">
        Cusine : {item.cusine}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={0.8}>
        <Box my={0.5}>
          <Typography variant="h6" color="#192F60" fontWeight="600">
            {item.name}
          </Typography>

          <Typography variant="body1" color="#304676" fontWeight="500">
            cost : {item.cost}
          </Typography>
        </Box>
        <Box display="flex" gap={1} my={1}>
          <Remove onClick={() => handleQuantity("dec")} htmlColor="#192F60" />
          <Typography variant="body1" fontWeight="600">
            {quantity}
          </Typography>
          <Add onClick={() => handleQuantity("inc")} htmlColor="#192F60" />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Dish;
