import React from "react";
import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sideBar/Sidebar.jsx";
import UserList from "./pages/userList/UserList.jsx";
import AdminList from "./pages/adminList/AdminList.jsx";
import MedicineList from "./pages/medicineList/MedicineList.jsx";
import Report from "./pages/Report/Report.jsx";
import Login from "./pages/Login/Login.jsx";
import Uploading from "./pages/Uploading/Uploading.jsx";
import CreatePatient from "./pages/CreatePatient/CreatePatient.jsx";
import CreateMedicine from "./pages/CreateMedicine/CreateMedicine.jsx";
import CreateAdmin from "./pages/CreateAdmin/CreateAdmin.jsx";
import Relatives from "./pages/Relatives/Relatives.jsx";
import EditAdmin from "./pages/EditAdmin/EditAdmin.jsx";
import EditMedicine from "./pages/EditMedicine/EditMedicine.jsx";
import EditPatient from "./pages/EditPatient/EditPatient.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/home" element={<UserList />} />
              <Route path="/admin" element={<AdminList />} />
              <Route path="/medicine" element={<MedicineList />} />
              <Route path="/report" element={<Report />} />
              <Route path="/uploading" element={<Uploading />} />
              <Route path="/home" element={<App />} />
              <Route path="/createP" element={<CreatePatient />} />
              <Route path="/createM" element={<CreateMedicine />} />
              <Route path="/createA" element={<CreateAdmin />} />
              <Route path="/assistant" element={<Relatives />} />
              <Route path="/editAdmin/:editAdminId" element={<EditAdmin />} />
              <Route
                path="/editMedicine/:editMedicineId"
                element={<EditMedicine />}
              />
              <Route
                path="/editPatient/:editPatientId"
                element={<EditPatient />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
