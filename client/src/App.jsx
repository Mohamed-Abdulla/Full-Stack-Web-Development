import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display: flex;
`;
const Wrapper = styled.div`
  flex: 10;
  padding: 25px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [toggle, setToggle] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar toggle={toggle} setToggle={setToggle} />
          <Main>
            <Menu
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              toggle={toggle}
            />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route
                    index
                    element={<Home type="random" toggle={toggle} />}
                  />
                  <Route
                    path="trends"
                    element={<Home type="trend" toggle={toggle} />}
                  />
                  <Route
                    path="subscriptions"
                    element={<Home type="sub" toggle={toggle} />}
                  />
                  <Route path="search" element={<Search />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
