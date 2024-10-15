import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/sideBar/Sidebar.jsx";
import UserList from "./pages/userList/UserList.jsx";
import AdminList from "./pages/adminList/AdminList.jsx";
import MedicineList from "./pages/medicineList/MedicineList.jsx";
import Report from "./pages/Report/Report.jsx";
import Uploading from "./pages/Uploading/Uploading.jsx";
import CreatePatient from "./pages/CreatePatient/CreatePatient.jsx";
import CreateMedicine from "./pages/CreateMedicine/CreateMedicine.jsx";
import CreateAdmin from "./pages/CreateAdmin/CreateAdmin.jsx";
import Relatives from "./pages/Relatives/Relatives.jsx";
import EditAdmin from "./pages/EditAdmin/EditAdmin.jsx";
import EditMedicine from "./pages/EditMedicine/EditMedicine.jsx";
import EditPatient from "./pages/EditPatient/EditPatient.jsx";
import { Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/admin" element={<AdminList />} />
          <Route path="/medicine" element={<MedicineList />} />
          <Route path="/report" element={<Report />} />
          <Route path="/uploading" element={<Uploading />} />
          <Route path="/createP" element={<CreatePatient />} />
          <Route path="/createM" element={<CreateMedicine />} />
          <Route path="/createA" element={<CreateAdmin />} />
          <Route path="/assistant" element={<Relatives />} />
          <Route path="/editAdmin/:editAdminId" element={<EditAdmin />} />
          <Route
            path="/editMedicine/:editMedicineId"
            element={<EditMedicine />}
          />
          <Route path="/editPatient/:editPatientId" element={<EditPatient />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
