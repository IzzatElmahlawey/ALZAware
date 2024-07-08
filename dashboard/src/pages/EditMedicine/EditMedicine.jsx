import React, { useState, useContext } from "react";
import axios from "axios";
import "./editMedicine.css";
import TokenContext from "../Token/TokenContext.js";

export default function EditMedicine() {
  const { token } = useContext(TokenContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = "Name is required";
    if (!description) formErrors.description = "Description is required";
    if (!companyName) formErrors.companyName = "Company name is required";

    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (id) => {
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `http://alzaware.runasp.net/api/Medicine/UpdateMedicine/${id}`,
          {
            name,
            description,
            companyName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Medicine updated successfully");
          setName("");
          setDescription("");
          setCompanyName("");
        } else {
          alert("Failed to update medicine");
        }
      } catch (error) {
        console.error("Error updating medicine:", error);
        alert("An error occurred while updating the medicine");
      }
    }
  };

  return (
    <div className="editMedicine">
      <h1 className="editMedicineTitle">Edit Medicine</h1>
      <form className="editMedicineForm" onSubmit={handleSubmit}>
        <div className="editMedicineItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="editMedicineItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="editMedicineItem">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {errors.companyName && <p className="error">{errors.companyName}</p>}
        </div>
        <button className="editMedicineButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
