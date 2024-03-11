import React from "react";
import "./editMedicine.css";
import { useState } from "react";

export default function EditMedicine() {
  const [medicine, setMedicine] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!medicine) formErrors.medicine = "Medicine is required";
    if (!company) formErrors.company = "Company is required";
    if (!description) formErrors.description = "Description is required";
    setErrors(formErrors);
    return formErrors;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Done");
    }
  };

  return (
    <div className="editMedicine">
      <h1 className="editMedicineTitle">Edit Medicine</h1>
      <form className="editMedicineForm" onSubmit={handleSubmit}>
        <div className="editMedicineItem">
          <label>Medicine</label>
          <input
            type="text"
            placeholder="medicine"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
          {errors.medicine && <p className="error">{errors.medicine}</p>}
        </div>
        <div className="editMedicineItem">
          <label>Company</label>
          <input
            type="text"
            placeholder="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>
        <div className="editMedicineItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <button className="editMedicineButton">Update</button>
      </form>
    </div>
  );
}
