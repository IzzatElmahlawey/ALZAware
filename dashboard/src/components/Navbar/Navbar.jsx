import React from "react";
import "./navbar.css";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import profile from "./profile.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="topLeft">
          <span className="logo">ALZAware</span>
        </div>
        <div className="topRight">
          <div className="navbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="navbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="navbarIconContainer">
            <SettingsIcon />
          </div>
          <img src={profile} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
