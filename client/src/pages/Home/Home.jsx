import { Grid } from "@mui/material";
import Cards from "./components/Cards/Cards";
import Header from "./components/Header/Header";

const Home = () => {
  return (
    <Grid container justifyContent="space-between" direction="column" alignItems="stretch" spacing={5}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Cards />
      </Grid>
    </Grid>
  );
};

export default Home;
