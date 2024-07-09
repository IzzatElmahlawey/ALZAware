import React, { useState, useEffect, useContext } from "react";
import "./medicineList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import TokenContext from "../Token/TokenContext.js";

export default function MedicineList() {
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
        "http://alzaware.runasp.net/api/Medicine/GetAllMedicines",
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
      await axios.delete(
        `http://alzaware.runasp.net/api/Medicine/DeleteMedicine/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/editMedicine/${params.row.id}`}>
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

  return (
    <div className="medicineList">
      <div className="Top">
        <input
          className="searchMedicine"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/createM" className="addMedicine">
          Add Medicine
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        disableRowSelectionOnClick
        rows={filteredData}
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
