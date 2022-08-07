import { Link } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { Img } from "../style";
import useFetch from "../../../hooks/useFetch";

const Card = ({ res }) => {
  console.log(res);
  return (
    <>
      {res ? (
        <Link to={`/res/${res?.restaurantID?._id || res?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap="60px" marginBottom={3} marginTop={1}>
              <Img src={res?.restaurantID?.thumb || res?.thumb} alt="item.name" />
              <Box display="flex" flexDirection="column" gap="10px">
                <Typography variant="h5" fontSize={30} fontWeight="600" color="#192F60">
                  {res?.restaurantID?.name || res?.name}
                </Typography>
                <Typography variant="body1" fontWeight="600" color="#192F60">
                  {res?.restaurantID?.city_name || res?.city_name}
                </Typography>
                <Typography variant="body1" fontWeight="500" color="#636F88">
                  {res?.restaurantID?.address || res?.address}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" gap="110px" my={2}>
              <Typography variant="body1" fontWeight="600" color="#636F88">
                CUISINES:
              </Typography>
              <Typography variant="body1" fontWeight="500" color="#192F60">
                {res?.cusine || "cusine"}
              </Typography>
            </Box>
            <Box display="flex" gap="60px" my={2}>
              <Typography variant="body1" fontWeight="600" color="#636F88">
                COST FOR TWO:
              </Typography>
              <Typography variant="body1" fontWeight="500" color="#192F60">
                ₹{res?.cost || "cost"}
              </Typography>
            </Box>
          </Box>
        </Link>
      ) : (
        <Typography variant="h5" color="red" align="center" my={10}>
          Sorry...Currently No Restaurants available..
        </Typography>
      )}
    </>
  );
};

export default Card;
