import React, { useState, useContext } from "react";
import axios from "axios";
import "./editPatient.css";
import TokenContext from "../Token/TokenContext.js";

export default function EditPatient() {
  const { token } = useContext(TokenContext);

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
    if (!form.phone) formErrors.phone = "Phone number is required";
    if (!form.ssn) formErrors.ssn = "SSN is required";
    if (!form.city) formErrors.city = "City is required";
    if (!form.street) formErrors.street = "Street is required";
    if (!form.zipCode) formErrors.zipCode = "Zip code is required";
    if (!form.birthDate) formErrors.birthDate = "Birth date is required";
    if (!form.gender) formErrors.gender = "Gender is required";
    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (id) => {
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `http://alzaware.runasp.net/api/Patient/${id}`,
          form,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Patient information updated successfully");
        }
      } catch (error) {
        console.error("There was an error updating the patient!", error);
        alert("An error occurred while updating the patient information.");
      }
    }
  };

  return (
    <div className="editPatient">
      <h1 className="editPatientTitle">Edit Patient</h1>
      <form className="editPatientForm" onSubmit={handleSubmit}>
        <div className="editPatientItem">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="ssn">SSN</label>
          <input
            id="ssn"
            type="text"
            name="ssn"
            placeholder="SSN"
            onChange={handleChange}
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            name="street"
            placeholder="Street"
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            onChange={handleChange}
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
        </div>
        <div className="editPatientItem">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            onChange={handleChange}
          />
          {errors.birthDate && <p className="error">{errors.birthDate}</p>}
        </div>
        <div className="editPatientItem">
          <label>Gender</label>
          <div className="editPatientGender">
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
        <button className="editPatientButton">Update</button>
      </form>
    </div>
  );
}
