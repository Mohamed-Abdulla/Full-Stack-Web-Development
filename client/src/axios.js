import axios from "axios";

//.axios is used to fetch data from backend to front end

//.create instance for an axios
const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export default instance;
