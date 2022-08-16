import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useEffect, useState } from "react";

const FilterBox = ({ data, filters, handleFilters, handleCostRange, handleCusineChange, setFilterData }) => {
  const locality = data?.map((data) => data.locality);
  const [showfilter, setShowFilter] = useState(false);

  useEffect(() => {
    const res = async () => {
      try {
        const res = await axios.post("/res/filter", filters);
        setFilterData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    res();
  }, [filters]);

  return (
    <>
      <Box onClick={() => setShowFilter(!showfilter)} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="600" color="#192F60">
          Filters
        </Typography>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: { xs: showfilter ? "block" : "none", sm: "block" },
        }}
        position="sticky"
        top="104px"
      >
        {/* <Typography variant="h6" color="#192F60">
          Filters
        </Typography> */}

        <Typography my={1}>Select Location</Typography>
        <FormControl size="small" sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="locality"
            label="location"
            onChange={handleFilters}
            defaultValue=""
          >
            {locality?.map((loc, index) => (
              <MenuItem key={index} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
          Cuisine
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => handleCusineChange(e, "North Indian")} />}
            label="North Indian"
            value="North Indian"
            name="cusine"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => handleCusineChange(e, "South Indian")} />}
            label="South Indian"
            value="South Indian"
            name="cusine"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => handleCusineChange(e, "Chinese")} />}
            label="Chinese"
            value="Chinese"
            name="cusine"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => handleCusineChange(e, "Fast Food")} />}
            label="Fast Food"
            value="Fast Food"
            name="cusine"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => handleCusineChange(e, "Street Food")} />}
            label="Street Food"
            value="Street Food"
            name="cusine"
          />
        </FormGroup>
        <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
          Cost For Two
        </Typography>
        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="priceRange">
            <FormControlLabel
              name="cost"
              value="0"
              control={<Radio size="small" />}
              label="Less than ` 500"
              onChange={() => {
                handleCostRange(0, 500);
              }}
            />
            <FormControlLabel
              name="cost"
              value="1"
              control={<Radio size="small" />}
              label="500 to ` 1000"
              onChange={() => {
                handleCostRange(500, 1000);
              }}
            />
            <FormControlLabel
              name="cost"
              value="2"
              control={<Radio size="small" />}
              label="1000 to ` 1500"
              onChange={() => {
                handleCostRange(1000, 1500);
              }}
            />
            <FormControlLabel
              name="cost"
              value="3"
              control={<Radio size="small" />}
              label="1500 to ` 2000"
              onChange={() => {
                handleCostRange(1500, 2000);
              }}
            />
            <FormControlLabel
              name="cost"
              value="4"
              control={<Radio size="small" />}
              label="2000+"
              onChange={() => {
                handleCostRange(2000, 500000);
              }}
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body1" fontWeight="600" color="#192F60">
          Sort
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="sort"
            onChange={handleFilters}
          >
            <FormControlLabel value="1" control={<Radio size="small" />} label="Price low to high" />
            <FormControlLabel value="-1" control={<Radio size="small" />} label="Price high to low" />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default FilterBox;
