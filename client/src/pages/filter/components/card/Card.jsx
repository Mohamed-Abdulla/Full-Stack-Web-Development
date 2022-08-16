import { Link } from "react-router-dom";
import { Box, Typography, Divider, CircularProgress, Rating } from "@mui/material";
import { Img } from "../../style";
import { useState } from "react";

const Card = ({ res, loading }) => {
  const menu = res?.menus;
  let cost = menu?.map((item) => item?.cost);
  cost = cost?.reduce((a, b) => a + b, 0) / cost?.length;

  const [value, setValue] = useState(3);

  return (
    <>
      {!loading ? (
        <Link to={`/res/${res?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap="60px" marginBottom={3} marginTop={1}>
              <Img src={res?.thumb} alt="item.name" />
              <Box display="flex" flexDirection="column" gap="10px">
                <Typography variant="h5" fontSize={{ sm: 30, xs: 22 }} fontWeight="600" color="#192F60">
                  {res?.name}
                </Typography>
                <Typography variant="body1" fontWeight="600" color="#192F60">
                  {res?.city_name}
                </Typography>
                <Typography variant="body1" fontWeight="500" color="#636F88" display={{ xs: "none", sm: "block" }}>
                  {res?.address}
                </Typography>
                <Rating
                  name="read-only"
                  value={value}
                  readOnly
                  sx={{ marginBottom: 1, display: { xs: "flex", sm: "none" } }}
                />
              </Box>
            </Box>
            <Rating
              name="read-only"
              value={value}
              readOnly
              sx={{ marginBottom: 1, display: { xs: "none", sm: "flex" } }}
            />
            <Divider />
            <Box display="flex" gap={{ sm: "110px", xs: "20px" }} my={{ sm: 2, xs: 1 }}>
              <Typography ography variant="body1" fontWeight="600" color="#636F88">
                CUISINES:
              </Typography>
              {menu?.map((item) => (
                <Typography variant="body1" fontWeight="500" color="#192F60" key={item._id}>
                  {item.cusine}
                </Typography>
              ))}
            </Box>
            <Box display="flex" gap={{ sm: "60px", xs: "20px" }} my={{ sm: 2, xs: 1 }}>
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress color="error" />
        </Box>
      )}
    </>
  );
};

export default Card;
