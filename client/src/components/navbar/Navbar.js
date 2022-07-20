import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

function Navbar() {
  const { dispatch } = useContext(AuthContext);
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      //listen to scroll event
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll"); //remove event listener before again rendered
    };
  }, []);
  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img
        className="nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <div className="profile">
        <img
          className="nav-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix Avatar"
        />
        {/* <ArrowDropDownIcon className="icon" /> */}
        <div className="options">
          <span>Settings</span>
          <span onClick={() => dispatch(logout())}>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
