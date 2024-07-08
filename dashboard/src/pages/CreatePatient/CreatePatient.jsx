import React, { useState, useContext } from "react";
import axios from "axios";
import "./createPatient.css";
import TokenContext from "../Token/TokenContext.js";

export default function CreatePatient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    ssn: "",
    city: "",
    street: "",
    zipCode: "",
    birthDate: "",
    gender: "",
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

    if (!form.firstName) formErrors.firstName = "First name is required";
    if (!form.lastName) formErrors.lastName = "Last name is required";
    if (!form.birthDate) formErrors.birthDate = "Birth date is required";
    if (!form.phone) formErrors.phone = "Phone number is required";
    if (!form.ssn) formErrors.ssn = "SSN is required";
    if (!form.city) formErrors.city = "City is required";
    if (!form.street) formErrors.street = "Street is required";
    if (!form.zipCode) formErrors.zipCode = "Zip code is required";
    if (!form.gender) formErrors.gender = "Gender is required";
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
          "http://alzaware.runasp.net/api/Patient/Create",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Patient created successfully");
        setData(response.data);
      } catch (error) {
        console.error("Error creating patient:", error);
        alert("An error occurred while creating the patient");
      }
    }
  };
  return (
    <div className="newPatient">
      <h1 className="newPatientTitle">New Patient</h1>
      <form className="newPatientForm" onSubmit={handleSubmit}>
        <div className="newPatientItem">
          <label>FirstName</label>
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="newPatientItem">
          <label>LastName</label>
          <input
            type="text"
            name="lastName"
            placeholder="LastName"
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="newPatientItem">
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            placeholder="Birth Date"
          />
          {errors.birthDate && <p className="error">{errors.birthDate}</p>}
        </div>
        <div className="newPatientItem">
          <label>phone</label>
          <input
            type="number"
            name="phone"
            placeholder="phone"
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="newPatientItem">
          <label>SSN</label>
          <input
            type="number"
            name="ssn"
            placeholder="SSN"
            onChange={handleChange}
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>
        <div className="newPatientItem">
          <label>city</label>
          <input
            type="text"
            name="city"
            placeholder="city"
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="newPatientItem">
          <label>street</label>
          <input
            type="text"
            name="street"
            placeholder="street"
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="newPatientItem">
          <label>ZipCode</label>
          <input
            type="number"
            name="zipCode"
            placeholder="ZipCode"
            onChange={handleChange}
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
        </div>
        <div className="newPatientItem">
          <label>Gender</label>
          <div className="newPatientGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <button className="newPatientButton">Create</button>
      </form>
    </div>
  );
}
