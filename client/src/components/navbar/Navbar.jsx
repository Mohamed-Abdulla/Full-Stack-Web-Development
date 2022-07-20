import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?"))
      dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">LUX</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <FontAwesomeIcon
              icon={faRightToBracket}
              style={{ marginLeft: "20px", cursor: "pointer" }}
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
