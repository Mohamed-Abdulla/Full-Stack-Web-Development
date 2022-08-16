import { Backdrop, Box, Button, Fade, Grid, Modal, styled, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Dish from "../Dish/Dish";
import { AuthContext } from "../../../../context/AuthContext";
// import { CheckoutContext } from "../context/CheckoutContext";
import Order from "./Order";

const Checkout = ({ open, handleClose, data }) => {
  const { user } = useContext(AuthContext);

  const [openOrder, setOpenOrder] = useState(false);
  const handleOpenOrder = () => {
    if (user) {
      setOpenOrder(true);
    } else {
      alert("Please sign in before proceed");
      handleClose();
    }
  };
  const handleCloseOrder = () => setOpenOrder(false);

  const menu = data?.menus;
  // const { dispatch } = useContext(CheckoutContext);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handlepay = () => {
    // dispatch({ type: "Total", payload: total });
    handleOpenOrder();
  };
  const handClose = () => {
    handleClose();
    setTotalCost(0);
    setTotalQuantity(0);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { sm: 400, xs: 300 },
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handClose}
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
                marginTop: 3,
              }}
              // onSubmit={handleQuantity}
            >
              <Grid container spacing={2}>
                <Grid item>
                  {menu?.map((item, index) => (
                    <Dish
                      item={item}
                      key={index}
                      setTotalCost={setTotalCost}
                      setTotalQuantity={setTotalQuantity}
                      totalCost={totalCost}
                      totalQuantity={totalQuantity}
                    />
                  ))}
                  <Box display="flex" justifyContent={{ xs: "normal", sm: "flex-end" }} marginTop={1} fontWeight="500">
                    <Button variant="contained" color="error" onClick={handlepay}>
                      Add to Cart({totalQuantity})
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Order open={openOrder} handleClose={handleCloseOrder} totalCost={totalCost} />
    </>
  );
};

export default Checkout;
