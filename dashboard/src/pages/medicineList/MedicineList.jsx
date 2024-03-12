import React from "react";
import { useState } from "react";
import "./medicineList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { medicineRows } from "../../dummyData";
import { Link } from "react-router-dom";
export default function MedicineList() {
  const [data, setData] = useState(medicineRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "medicine", headerName: "Medicine", width: 200 },
    { field: "company", headerName: "Company", width: 200 },
    {
      field: "admin",
      headerName: "Admin",
      width: 160,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editMedicine/" + params.row.id}>
              <button className="medicineListEdit">Edit</button>
            </Link>
            <DeleteIcon
              className="medicineListDelete"
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

  const filteredRows = data.filter((medicineRows) => {
    return (
      medicineRows.medicine.toLowerCase().includes(searchText.toLowerCase()) ||
      medicineRows.company.toLowerCase().includes(searchText.toLowerCase()) ||
      medicineRows.admin.toLowerCase().includes(searchText.toLowerCase()) ||
      medicineRows.description.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="medicineList">
      <div className="Top">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
        <Link to="/createM" className="add">
          Add Medicine
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
