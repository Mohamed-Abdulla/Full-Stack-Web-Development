import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Skeleton from "./components/Skeleton";
import FullScreen from "./pages/FullScreen";
import Messenger from "./pages/Messenger";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";

function App() {
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                <Home darkMode={darkMode} setDarkMode={setDarkMode} />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/profile/:username"
            element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route path="/sharesk" element={<Skeleton type="share" />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/FullScreen/cover/:username" element={<FullScreen />} />
          <Route
            path="/FullScreen/profile/:username"
            element={<FullScreen />}
          />
          <Route
            path="/messenger"
            element={!user ? <Navigate to="/" /> : <Messenger />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
