import React, { useState, useEffect, useContext } from "react";
import "./adminList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import TokenContext from "../Token/TokenContext.js";

export default function AdminList() {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://alzaware.runasp.net/api/Admin/GetAllAdmins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const dataWithId = responseData.map((row, index) => ({
        ...row,
        id: row.id || index + 1,
      }));

      setData(dataWithId);
      setFilteredData(dataWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = () => {
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://alzaware.runasp.net/api/Admin/Delete/${id}`, {
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
    setSearchTerm(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "ssn", headerName: "SSN", width: 160 },
    { field: "birthDate", headerName: "Birth Date", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/editAdmin/" + params.row.id}>
            <button className="adminListEdit">Edit</button>
          </Link>
          <DeleteIcon
            className="adminListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="adminList">
      <div className="Top">
        <input
          className="searchAdmin"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/createA" className="addAdmin">
          Add Admin
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        disableRowSelectionOnClick
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        checkboxSelection
      />
    </div>
  );
}
