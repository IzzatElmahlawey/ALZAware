import React, { useState, useContext } from "react";
import axios from "axios";
import "./createMedicine.css";
import TokenContext from "../Token/TokenContext.js";

export default function CreateMedicine() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    companyName: "",
  });

  const [errors, setErrors] = useState({});
  const [setData] = useState(null);

  const { token } = useContext(TokenContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!form.name) formErrors.name = "Name is required";
    if (!form.description) formErrors.description = "Description is required";
    if (!form.companyName) formErrors.companyName = "Company name is required";
    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://alzaware.runasp.net/api/Medicine/CreateMedicine",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Medicine created successfully");
        setData(response.data);
      } catch (error) {
        console.error("Error creating medicine:", error);
        alert("An error occurred while creating the medicine");
      }
    }
  };

  return (
    <div className="newMedicine">
      <h1 className="newMedicineTitle">New Medicine</h1>
      <form className="newMedicineForm" onSubmit={handleSubmit}>
        <div className="newMedicineItem">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="newMedicineItem">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="newMedicineItem">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
          />
          {errors.companyName && <p className="error">{errors.companyName}</p>}
        </div>
        <button className="newMedicineButton">Create</button>
      </form>
    </div>
  );
}
