import React from "react";
import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sideBar/Sidebar.jsx";
import "./App.css";
import UserList from "./pages/userList/UserList.jsx";
import AdminList from "./pages/adminList/AdminList.jsx";
import Login from "./pages/Login/Login.jsx";
import Report from "./pages/Report/Report.jsx";
import Uploading from "./pages/Uploading/Uploading.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="user" element={<UserList />} />
          <Route path="admin" element={<AdminList />} />
          <Route path="login" element={<Login />} />
          <Route path="report" element={<Report />} />
          <Route path="uploading" element={<Uploading />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
