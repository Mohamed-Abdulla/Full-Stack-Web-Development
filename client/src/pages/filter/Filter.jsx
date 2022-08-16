import { Box, Container, Grow, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

import { StyledCard, StyledFilter } from "./style";
import Card from "./components/card/Card";
import FilterBox from "./components/filterBox/FilterBox";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const mealtype = searchParams.get("mealtype");
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();

  const [filters, setFilters] = useState({
    mealtype: mealtype ? mealtype : "",
    locality: "",
    cusines: [],
    hcost: undefined,
    lcost: undefined,
    sort: 1,
  });
  const [loading, setLoading] = useState(false);

  const filteredData = filterData ? filterData : data;

  const handleFilters = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCostRange = (lCost, hCost) => {
    setFilters((prev) => ({ ...prev, lcost: lCost, hcost: hCost }));
  };

  const handleCusineChange = (e, cusine) => {
    let { cusines } = filters;
    const index = cusines.indexOf(cusine);

    if (index < 0 && e.target.checked) {
      cusines.push(cusine);
    } else {
      cusines.splice(index, 1);
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

  return (
    <Box>
      <Navbar />
      <Grow in>
        <Container sx={{ padding: 4 }}>
          <Typography variant="h4" fontWeight="600" color="#192F60" marginBottom={3}>
            {mealtype ? mealtype : "Restaurants in"} {city ? city : "available in India"}
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={5}>
            <StyledFilter>
              <FilterBox
                data={data}
                setFilterData={setFilterData}
                filters={filters}
                handleFilters={handleFilters}
                handleCostRange={handleCostRange}
                handleCusineChange={handleCusineChange}
              />
            </StyledFilter>
            <Box>
              {filteredData?.length > 0 ? (
                filteredData?.map((res) => (
                  <StyledCard key={res._id}>
                    <Card res={res} loading={loading} />
                  </StyledCard>
                ))
              ) : (
                <Typography variant="h4" fontWeight="600" color="#192F60" m={10}>
                  No Restaurants Found ...
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
