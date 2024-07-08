import React, { useState, useEffect, useContext } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import SummarizeIcon from "@mui/icons-material/Summarize";
import axios from "axios";
import TokenContext from "../Token/TokenContext.js";

export default function UserList() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("");
  const { token } = useContext(TokenContext);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const url = key
        ? `http://alzaware.runasp.net/api/Patient/Search/${key}`
        : "http://alzaware.runasp.net/api/Patient/GetAll";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const dataWithId = responseData.map((row, index) => ({
        ...row,
        id: row.id || index + 1,
      }));

      setData(dataWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://alzaware.runasp.net/api/Patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setKey(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "ssn", headerName: "SSN", width: 160 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "birthDate", headerName: "Birth Date", width: 130 },
    { field: "city", headerName: "City", width: 110 },
    { field: "street", headerName: "Street", width: 110 },
    { field: "zipCode", headerName: "ZipCode", width: 110 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editPatient/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <Link to="/report">
              <SummarizeIcon className="userListSummarize" />
            </Link>
            <DeleteIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="Top">
        <input
          className="searchPatient"
          type="text"
          placeholder="Search..."
          value={key}
          onChange={handleSearch}
        />
        <Link to="/createP" className="addPatient">
          Add Patient
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        disableRowSelectionOnClick
        rows={data}
        columns={columns}
        getRowId={(row) => row.id || row.ssn}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8]}
        checkboxSelection
      />
    </div>
  );
}
