import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) dispatch(logout());
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Admin-Panel</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings onClick={handleLogout} />
          </div>
          <div>
            <img
              src={
                admin.img ||
                "data:image/png;base64,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"
              }
              alt=""
              className="topAvatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
