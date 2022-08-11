import { Link } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { Img } from "../style";

const Card = ({ rest, filterData }) => {
  const res = rest;
  console.log(res);
  const menu = res?.menus;
  let cost = menu?.map((item) => item?.cost);
  cost = cost?.reduce((a, b) => a + b, 0) / cost?.length;

  return (
    <>
      {res ? (
        <Link to={`/res/${res?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap="60px" marginBottom={3} marginTop={1}>
              <Img src={res?.thumb} alt="item.name" />
              <Box display="flex" flexDirection="column" gap="10px">
                <Typography variant="h5" fontSize={30} fontWeight="600" color="#192F60">
                  {res?.name}
                </Typography>
                <Typography variant="body1" fontWeight="600" color="#192F60">
                  {res?.city_name}
                </Typography>
                <Typography variant="body1" fontWeight="500" color="#636F88">
                  {res?.address}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" gap="110px" my={2}>
              <Typography ography variant="body1" fontWeight="600" color="#636F88">
                CUISINES:
              </Typography>
              {menu?.map((item) => (
                <Typography variant="body1" fontWeight="500" color="#192F60">
                  {item.meal_type}
                </Typography>
              ))}
            </Box>
            <Box display="flex" gap="60px" my={2}>
              <Typography variant="body1" fontWeight="600" color="#636F88">
                COST FOR TWO:
              </Typography>
              <Typography variant="body1" fontWeight="500" color="#192F60">
                ₹{cost}
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
