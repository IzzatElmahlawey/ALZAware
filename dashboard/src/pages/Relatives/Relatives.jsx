import React from "react";
import "./relatives.css";
import { useState } from "react";

export default function Relatives() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    ssn: "",
    city: "",
    street: "",
    zipCode: "",
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
    if (!form.gender) formErrors.gender = "Gender is required";
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
    <div className="newRelative">
      <h1 className="newRelativeTitle">Add Assistant</h1>
      <form className="newRelativeForm" onSubmit={handleSubmit}>
        <div className="newRelativeItem">
          <label>FirstName</label>
          <input
            type="text"
            placeholder="FirstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="newRelativeItem">
          <label>LastName</label>
          <input
            type="text"
            placeholder="LastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="newRelativeItem">
          <label>phone</label>
          <input
            type="number"
            placeholder="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="newRelativeItem">
          <label>SSN</label>
          <input
            type="number"
            placeholder="SSN"
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>
        <div className="newRelativeItem">
          <label>city</label>
          <input
            type="text"
            placeholder="city"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="newRelativeItem">
          <label>street</label>
          <input
            type="text"
            placeholder="street"
            name="street"
            value={form.street}
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="newRelativeItem">
          <label>ZipCode</label>
          <input
            type="number"
            placeholder="ZipCode"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
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
        <button className="newRelativeButton">Create</button>
      </form>
    </div>
  );
}
