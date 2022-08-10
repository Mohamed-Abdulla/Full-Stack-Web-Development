import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const FilterBox = ({ setFilter, data }) => {
  const [range, setRange] = useState("");
  const [location, setLocation] = useState([]);
  const locality = data?.map((data) => data.locality);
  const [filters, setFilters] = useState({});
  const [checkedState, setCheckedState] = useState(new Array(cusine.length).fill(false));

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });

    // setIsChecked(!isChecked);
  };

  return (
    <>
      <Typography variant="h6" color="#192F60">
        Filters
      </Typography>
      <Typography my={1}>Select Location</Typography>
      <FormControl size="small" sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="location"
          label="location"
          onChange={handleFilters}
        >
          {locality?.map((loc) => (
            <MenuItem value={loc}>{loc}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
        Cuisine
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked size="small" onChange={handleFilters} checked={isChecked} />}
          label="North Indian"
          value="North Indian"
          name="cusine"
        />
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleFilters} checked={isChecked} />}
          label="South Indian"
          value="South Indian"
          name="cusine"
        />
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleFilters} checked={isChecked} />}
          label="Chinese"
          value="Chinese"
          name="cusine"
        />
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleFilters} checked={isChecked} />}
          label="Fast Food"
          value="Fast Food"
          name="cusine"
        />
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleFilters} checked={isChecked} />}
          label="Street Food"
          value="Street Food"
          name="cusine"
        />
      </FormGroup>
      <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
        Cost For Two
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="price-range"
          onChange={handleFilters}
        >
          <FormControlLabel value="0" control={<Radio size="small" />} label="Less than ` 500" />
          <FormControlLabel value="1" control={<Radio size="small" />} label="500 to ` 1000" />
          <FormControlLabel value="2" control={<Radio size="small" />} label="1000 to ` 1500" />
          <FormControlLabel value="3" control={<Radio size="small" />} label="1500 to ` 2000" />
          <FormControlLabel value="4" control={<Radio size="small" />} label="2000+" />
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
          <FormControlLabel value="0" control={<Radio size="small" />} label="Price low to high" />
          <FormControlLabel value="1" control={<Radio size="small" />} label="Price high to low" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default FilterBox;
