import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Home from "./pages/Home/Home";
import Restaurant from "./pages/restaurant/Restaurant";
import Filter from "./pages/filter/Filter";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="res/:id" index element={<Restaurant />} />
            <Route path="filter" index element={<Filter />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
