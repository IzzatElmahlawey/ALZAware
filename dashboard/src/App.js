import React from "react";
import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sideBar/Sidebar.jsx";
import "./App.css";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <div>
              <Login />
            </div>
          }
        />
      </Routes>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/admin" element={<AdminList />} />
            <Route path="/medicine" element={<MedicineList />} />
            <Route path="/report" element={<Report />} />
            <Route path="/uploading" element={<Uploading />} />
            <Route path="/" element={<App />} />
            <Route path="createP" element={<CreatePatient />} />
            <Route path="createM" element={<CreateMedicine />} />
            <Route path="createA" element={<CreateAdmin />} />
            <Route path="assistant" element={<Relatives />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
