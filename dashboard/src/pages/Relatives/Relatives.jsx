import React, { useState, useContext } from "react";
import axios from "axios";
import "./relatives.css";
import TokenContext from "../Token/TokenContext.js";

export default function Relatives({ patientId }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    ssn: "",
    city: "",
    street: "",
    zipCode: "",
    gender: "",
    birthDate: "",
    relationshipDegree: "",
  });

  const [errors, setErrors] = useState({});
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
    if (!form.password) formErrors.password = "Password is required";
    if (!form.ssn) formErrors.ssn = "SSN is required";
    if (!form.city) formErrors.city = "City is required";
    if (!form.street) formErrors.street = "Street is required";
    if (!form.zipCode) formErrors.zipCode = "Zip code is required";
    if (!form.gender) formErrors.gender = "Gender is required";
    if (!form.birthDate) formErrors.birthDate = "Birth date is required";
    if (!form.relationshipDegree)
      formErrors.relationshipDegree = "Relationship degree is required";
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
          `http://alzaware.runasp.net/api/AddRelative/AddRelative/${patientId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Relative added successfully");
        }
      } catch (error) {
        console.error("There was an error adding the relative!", error);
        alert("An error occurred while adding the relative.");
      }
    }
  };

  return (
    <div className="newRelative">
      <h1 className="newRelativeTitle">Add Relative</h1>
      <form className="newRelativeForm" onSubmit={handleSubmit}>
        <div className="newRelativeItem">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="ssn">SSN</label>
          <input
            id="ssn"
            type="text"
            placeholder="SSN"
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            placeholder="Street"
            name="street"
            value={form.street}
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <p className="error">{errors.birthDate}</p>}
        </div>
        <div className="newRelativeItem">
          <label htmlFor="relationshipDegree">Relationship Degree</label>
          <input
            id="relationshipDegree"
            type="text"
            placeholder="Relationship Degree"
            name="relationshipDegree"
            value={form.relationshipDegree}
            onChange={handleChange}
          />
          {errors.relationshipDegree && (
            <p className="error">{errors.relationshipDegree}</p>
          )}
        </div>
        <div className="newRelativeItem">
          <label>Gender</label>
          <div className="newRelativeGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
              checked={form.gender === "male"}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
              checked={form.gender === "female"}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <button className="newRelativeButton">Create</button>
      </form>
    </div>
  );
}
