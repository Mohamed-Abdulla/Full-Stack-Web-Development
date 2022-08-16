import { Avatar, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { SearchOutlined, LocationOnOutlined, Start } from "@mui/icons-material";
import {
  StyledContainer,
  ButtonContainer,
  SignUpButton,
  Logo,
  Profile,
  StyledAvatar,
  StyledUsername,
  SearchContainer,
  SearchLocation,
} from "./style";
import logo from "../../../../assets/images/zomato_white.png";
import Auth from "../../../../components/Auth/Auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  //*open Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, dispatch } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [cityquery, setCityQuery] = useState("");
  const [resdata, setResData] = useState([]);
  const [citydata, setCitydata] = useState([]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const res = async () => {
      try {
        const res = await axios.get(`/res/search?name=${query}`);
        setResData(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    res();
  };
  const handleCitySearch = (e) => {
    setCityQuery(e.target.value);
    const res = async () => {
      try {
        const res = await axios.get(`/res/city?c=${query}`);
        setCitydata(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    res();
  };

  return (
    <StyledContainer>
      <Grid container spacing={4} direction="column">
        <ButtonContainer>
          {user ? (
            <Profile>
              <StyledAvatar src={user?.imageUrl} alt={user?.name}>
                {user?.name.charAt(0)}
              </StyledAvatar>
              <StyledUsername variant="h6" color="white">
                {user?.name}
              </StyledUsername>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Profile>
          ) : (
            <>
              <Auth open={open} handleClose={handleClose} />
              <SignUpButton onClick={handleOpen} variant="outlined" color="error" sx={{ fontSize: { sm: 18, xs: 15 } }}>
                Sign-in / Sign-up
              </SignUpButton>
            </>
          )}
        </ButtonContainer>
        <Grid item alignSelf="center" marginTop={2}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo src={logo} alt="" />
          </Link>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h3"
            align="center"
            color="white"
            sx={{
              fontSize: {
                xs: "26px",
              },
            }}
          >
            Find the best restaurants, cafés, and bars
          </Typography>
        </Grid>

        <Grid container spacing={3} justifyContent="center" my={2}>
          <Grid item xs={9} sm={2.5} ml={3.5}>
            <TextField
              name="location"
              variant="outlined"
              placeholder="Location"
              fullWidth
              onChange={handleCitySearch}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <LocationOnOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {cityquery && (
              <SearchLocation>
                {citydata?.map((item, index) => (
                  <Link
                    to={`filter?city=${item.city_name}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={index}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="500"
                      my={0.8}
                      sx={{
                        ":hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      {item.city_name}
                    </Typography>
                  </Link>
                ))}
              </SearchLocation>
            )}
          </Grid>

          <Grid item xs={9} sm={5} ml={3.5}>
            <TextField
              onChange={handleSearch}
              name="restaurants"
              variant="outlined"
              placeholder="Restaurants"
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {query && (
              <SearchContainer>
                {resdata?.map((item, index) => (
                  <Link to={`/res/${item._id}`} style={{ textDecoration: "none", color: "inherit" }} key={index}>
                    <Box
                      display="flex"
                      gap={3}
                      py={1}
                      justifyContent="space-between"
                      sx={{
                        ":hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <Box display="flex" gap={3}>
                        <Avatar src={item.thumb} alt={item.name} />
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="#74819E">
                            {item.locality}
                          </Typography>
                        </Box>
                      </Box>
                      <Box justifyContent="flex-end">
                        <Start sx={{ opacity: 0.8 }} />
                      </Box>
                    </Box>
                  </Link>
                ))}
              </SearchContainer>
            )}
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Header;
