import { Backdrop, Box, Button, Fade, Grid, Modal, styled, TextField, Typography } from "@mui/material";

const Order = ({ open, handleClose }) => {
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

  const handleSubmit = async (e) => {};

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
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <StyledTextField
                    name="name"
                    label="Name"
                    // onChange={handleChange}
                    placeholder="Enter your name"
                    autoFocus
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                  />
                  <StyledTextField
                    name="mobile"
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    // onChange={handleChange}
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                  />
                  <StyledTextField
                    id="outlined-multiline-static"
                    name="address"
                    label="Address"
                    placeholder="Enter your address" // onChange={handleChange}
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                  />
                  <Box display="flex" justifyContent="flex-end" marginTop={1}>
                    <Button variant="contained" color="error">
                      proceed
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

export default Order;
