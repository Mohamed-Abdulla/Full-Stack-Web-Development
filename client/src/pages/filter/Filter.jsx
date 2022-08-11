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
  const [filterData, setFilterData] = useState([]);
  const locality = data?.map((data) => data.locality);

  const [filters, setFilters] = useState({
    locality: locality,
    cusine: [],
    priceRange: "",
    sort: "",
  });

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
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
            {mealtype ? mealtype : "Restaurants"} in {city ? city : "India"}
          </Typography>
          <Box display="flex" gap={5}>
            <StyledFilter>
              <FilterBox
                setFilterData={setFilterData}
                data={data}
                filters={filters}
                setFilters={setFilters}
                handleFilters={handleFilters}
              />
            </StyledFilter>
            <Box>
              {data &&
                data?.map((res) => (
                  <StyledCard>
                    <Card rest={res} filterData={filterData} />
                  </StyledCard>
                ))}
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
