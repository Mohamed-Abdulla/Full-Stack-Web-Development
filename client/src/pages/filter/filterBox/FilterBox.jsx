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

const FilterBox = ({ setFilter, city, mealtype }) => {
  const [range, setRange] = useState("");
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const res = async () => {
      try {
        const res = await axios.get(`/res/find?city=${city}`);
        console.log(res.data);
        setLocation(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    res();
  }, [city]);

  const handleRange = (e) => {
    setRange(e.target.value);
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
          value={location}
          label="location"
          // onSelect={handleRange}
        >
          {location.map((locality) => (
            <MenuItem value={locality.locality}>{locality.locality}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
        Cuisine
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="North Indian" />
        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="South Indian" />
        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Chinese" />
        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Fast Food" />
        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Street Food" />
      </FormGroup>
      <Typography variant="body1" fontWeight="600" marginTop={2} color="#192F60">
        Cost For Two
      </Typography>
      <FormControl>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
          <FormControlLabel value="Less than ` 500" control={<Radio size="small" />} label="Less than ` 500" />
          <FormControlLabel value="500 to ` 1000" control={<Radio size="small" />} label="500 to ` 1000" />
          <FormControlLabel value="1000 to ` 1500" control={<Radio size="small" />} label="1000 to ` 1500" />
          <FormControlLabel value="1500 to ` 2000" control={<Radio size="small" />} label="1500 to ` 2000" />
          <FormControlLabel value="2000+" control={<Radio size="small" />} label="2000+" />
        </RadioGroup>
      </FormControl>
      <Typography variant="body1" fontWeight="600" color="#192F60">
        Sort
      </Typography>
      <FormControl>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
          <FormControlLabel
            value="lowToHigh"
            control={<Radio size="small" />}
            label="Price low to high"
            onChange={handleRange}
          />
          <FormControlLabel
            value="hignToLow"
            control={<Radio size="small" />}
            label="Price high to low"
            onChange={handleRange}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default FilterBox;
