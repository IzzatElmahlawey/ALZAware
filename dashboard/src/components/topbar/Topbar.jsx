import React from "react";
import "./topbar.css";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import profile from "./profile.png";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ALZAware</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img src={profile} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
