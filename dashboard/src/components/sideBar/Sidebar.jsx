import "./sidebar.css";
import MedicationIcon from "@mui/icons-material/Medication";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadIcon from "@mui/icons-material/Upload";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
export default function Sidebar() {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hospital</h3>
          <ul className="sidebarList">
            <Link to="/" className="sidebarListItem">
              <PersonIcon className="sidebarIcon" />
              Patients
            </Link>
            <Link to="/medicine" className="sidebarListItem">
              <MedicationIcon className="sidebarIcon" />
              Medicines
            </Link>
            <Link to="/admin" className="sidebarListItem">
              <AdminPanelSettingsIcon className="sidebarIcon" />
              Admins
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Addition</h3>
          <ul className="sidebarList">
            <Link to="/createP" className="sidebarListItem">
              <AddCircleIcon className="sidebarIcon" />
              Add Patient
            </Link>
            <Link to="/createM" className="sidebarListItem">
              <AddCircleIcon className="sidebarIcon" />
              Add Medicine
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">MRI</h3>
          <ul className="sidebarList">
            <Link to="/uploading" className="sidebarListItem">
              <UploadIcon className="sidebarIcon" />
              Uploading
            </Link>
            <Link to="/report" className="sidebarListItem">
              <SummarizeIcon className="sidebarIcon" />
              Report
            </Link>
            <Link to="/assistant" className="sidebarListItem">
              <PeopleIcon className="sidebarIcon" />
              Assistants
            </Link>
            <Link to="/login" className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              Logout
            </Link>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    </div>
  );
}
