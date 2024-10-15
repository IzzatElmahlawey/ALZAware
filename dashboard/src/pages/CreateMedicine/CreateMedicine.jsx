import React, { useState, useContext } from "react";
import axios from "axios";
import "./createMedicine.css";
import TokenContext from "../Token/TokenContext.js";
import * as yup from "yup";

// Define the Yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  companyName: yup.string().required("Company name is required"),
});

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

  // Use Yup for form validation
  const validateForm = async () => {
    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({}); // Clear errors if validation passes
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors); // Set the errors in state
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
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
