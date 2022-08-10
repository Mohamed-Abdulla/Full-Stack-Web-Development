import { Backdrop, Box, Button, Fade, Grid, Modal, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Dish from "../components/Dish/Dish";

const Checkout = ({ open, handleClose, data }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const menu = data?.menus;

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
  }));

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" fontSize="30px" fontWeight="600" color="#192F60">
              The Big Chill Cakery
            </Typography>
            <form
              sx={{
                width: "100%",
                marginTop: 3,
              }}
              onSubmit={handleQuantity}
            >
              <Grid container spacing={2}>
                <Grid item>
                  {menu?.map((item) => (
                    <Dish item={item} handleQuantity={handleQuantity} quantity={quantity} />
                  ))}
                  <Typography variant="h6">Sub Total : {menu?.cost * quantity}</Typography>
                  <Box display="flex" justifyContent="flex-end" marginTop={1} fontWeight="500">
                    <Button variant="contained" color="error">
                      Pay Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Checkout;
