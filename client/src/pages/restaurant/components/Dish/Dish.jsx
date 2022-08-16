import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { CheckoutContext } from "../../../../context/CheckoutContext";

const Dish = ({ item, setTotalQuantity, setTotalCost, totalQuantity, totalCost }) => {
  const [quantity, setQuantity] = useState(0);
  // const { dispatch } = useContext(CheckoutContext);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 0 && setQuantity(quantity - 1);
      setTotalQuantity(totalQuantity - 1);
      setTotalCost(totalCost - item.cost);
    } else {
      setQuantity(quantity + 1);
      setTotalQuantity(totalQuantity + 1);
      setTotalCost(totalCost + item.cost);
    }
  };

  const handleCart = () => {
    handleQuantity("inc");
    // disp;
  };

  return (
    <Box display="flex" flexDirection="column" my={1} width={{ sm: "400px", xs: "300px" }}>
      <Typography variant="body1" fontWeight="500" color="#000">
        Cusine : {item.cusine}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={0.8}>
        <Box my={0.5}>
          <Typography variant="h6" color="#192F60" fontWeight="600">
            {item.name}
          </Typography>

          <Typography variant="body1" color="#304676" fontWeight="500">
            cost : ₹ {item.cost}
          </Typography>
        </Box>
        <Box>
          <Box display="flex" gap={1} my={1}>
            {quantity < 1 && (
              <Button variant="outlined" color="error" onClick={handleCart}>
                ADD +
              </Button>
            )}
            {quantity >= 1 && (
              <Box display="flex" gap={1} border="1px solid gray" padding={0.7} borderRadius="5px">
                <Remove onClick={() => handleQuantity("dec")} htmlColor="#192F60" sx={{ cursor: "pointer" }} />
                <Typography variant="body1" fontWeight="600">
                  {quantity}
                </Typography>
                <Add onClick={() => handleQuantity("inc")} htmlColor="#192F60" sx={{ cursor: "pointer" }} />
              </Box>
            )}
          </Box>
          <Typography variant="body1" color="#192F60" fontWeight="600" textAlign="center">
            ₹ {quantity * item.cost}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Dish;
