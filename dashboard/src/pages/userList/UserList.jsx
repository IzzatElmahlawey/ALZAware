import { useState } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";

export default function UserList() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    { id: 1, lastName: "snow", firstName: "jon", age: 35 },
    { id: 2, lastName: "lannister", firstName: "cersei", age: 42 },
    { id: 3, lastName: "lannister", firstName: "jaime", age: 45 },
    { id: 4, lastName: "stark", firstName: "arya", age: 16 },
    { id: 5, lastName: "targaryen", firstName: "daenerys", age: 40 },
    { id: 6, lastName: "melisandre", firstName: "ahmed", age: 150 },
    { id: 7, lastName: "clifford", firstName: "ferrara", age: 44 },
    { id: 8, lastName: "frances", firstName: "rossini", age: 36 },
    { id: 9, lastName: "roxie", firstName: "harvey", age: 65 },
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="userList">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
