import React from "react";
import { useState } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import SummarizeIcon from "@mui/icons-material/Summarize";
export default function UserList() {
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "lastName", headerName: "Last name", width: 120 },
    {
      field: "ssn",
      headerName: "SSN",
      width: 160,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "city",
      headerName: "City",
      width: 110,
    },
    {
      field: "zipCode",
      headerName: "ZipCode",
      width: 110,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
    },
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

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.filter((userRows) => {
    return (
      userRows.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      userRows.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      userRows.phone.toLowerCase().includes(searchText.toLowerCase()) ||
      userRows.city.toLowerCase().includes(searchText.toLowerCase()) ||
      userRows.ssn.toString().includes(searchText.toString()) ||
      userRows.zipCode.toString().includes(searchText.toString()) ||
      userRows.gender.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="userList">
      <div className="Top">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
        <Link to="/createP" className="add">
          Add Patient
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        disableRowSelectionOnClick
        rows={filteredRows}
        columns={columns}
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
