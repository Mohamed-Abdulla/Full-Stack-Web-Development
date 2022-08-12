import { Box, Container, Grow, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

import { StyledCard, StyledFilter } from "./style";
import Card from "./card/Card";
import FilterBox from "./filterBox/FilterBox";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const mealtype = searchParams.get("mealtype");
  const [data, setData] = useState();
  const locality = data?.map((data) => data.locality);

  const [filters, setFilters] = useState({
    mealtype: mealtype ? mealtype : "",
    locality: locality,
    cusines: ["North Indian"],
    hcost: undefined,
    lcost: undefined,
    sort: 1,
  });

  const handleFilters = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCostRange = (lCost, hCost) => {
    setFilters((prev) => ({ ...prev, lcost: lCost, hcost: hCost }));
  };

  const handleCusineChange = (e, cusine) => {
    let { cusines } = filters;
    const index = cusines.indexOf(cusine);
    // console.log(index);
    // console.log("cusines", cusines);
    console.log("cuisine", cusine);

    if (index < 0 && e.target.checked) {
      cusines.push(cusine);
      // console.log("length of cusines", cusines.length);
    } else {
      cusines.splice(index, 1);
      // console.log(cusines);
    }
    setFilters((prev) => ({ ...prev, cusines: cusines }));
  };

  useEffect(() => {
    const res = async () => {
      if (city) {
        try {
          const res = await axios.get(`/res/find?city=${city}`);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        const res = await axios.get(`/res/find/menu/query?name=${mealtype}`);
        setData(res.data);
      }
    };
    res();
  }, [city, mealtype]);

  console.log(filters);
  console.log(data);

  return (
    <Box>
      <Navbar />
      <Grow in>
        <Container sx={{ padding: 4 }}>
          <Typography variant="h4" fontWeight="600" color="#192F60" marginBottom={3}>
            {mealtype ? mealtype : "Restaurants"} in {city ? city : "India"}
          </Typography>
          <Box display="flex" gap={5}>
            <StyledFilter>
              <FilterBox
                setData={setData}
                data={data}
                filters={filters}
                handleFilters={handleFilters}
                handleCostRange={handleCostRange}
                handleCusineChange={handleCusineChange}
              />
            </StyledFilter>
            <Box>
              {data?.length > 0 ? (
                data?.map((res) => (
                  <StyledCard key={res._id}>
                    <Card res={res} />
                  </StyledCard>
                ))
              ) : (
                <Typography variant="h4" fontWeight="600" textAlign="center" color="#192F60">
                  No data found..
                </Typography>
              )}
            </Box>
          </Box>
          {/* <Box display="flex" alignItems="center" justifyContent="center" my={2}>
            <Pagination count={10} color="standard" />
          </Box> */}
        </Container>
      </Grow>
    </Box>
  );
};

export default Filter;
