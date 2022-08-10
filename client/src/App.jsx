import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, getPaginationUtilityClass } from "@mui/material";

import Home from "./pages/Home/Home";
import Restaurant from "./pages/restaurant/Restaurant";
import Filter from "./pages/filter/Filter";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const client_id = "1042033924959-8fmtjau0somhl015v3128uqho1vop8gc.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  // const accessToken=gapi.auth.getToken().access_token;
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
