import React from "react";
import "./createAdmin.css";
import { useState } from "react";
import axios from "axios";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    ssn: "",
    city: "",
    street: "",
    birthDate: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [setData] = useState(null);

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
    if (!form.zipCode) formErrors.zipCode = "zipCode is required";
    if (!form.city) formErrors.city = "City is required";
    if (!form.street) formErrors.street = "Street is required";
    if (!form.birthDate) formErrors.birthDate = "Birth date is required";
    if (!form.password) formErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      formErrors.confirmPassword = "Password doesn't match";
    if (!form.gender) formErrors.gender = "Gender is required";
    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://alzaware.runasp.net/api/Admin/Create",
          form,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Admin created successfully!");
        setData(response.data);
      } catch (error) {
        console.error("Error creating admin:", error);
      }
    }
  };

  return (
    <div className="newAdmin">
      <h1 className="newAdminTitle">New Admin</h1>
      <form className="newAdminForm" onSubmit={handleSubmit}>
        <div className="newAdminItem">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="newAdminItem">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="newAdminItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="newAdminItem">
          <label>SSN</label>
          <input
            type="text"
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
            placeholder="SSN"
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>

        <div className="newAdminItem">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="newAdminItem">
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Street"
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>

        <div className="newAdminItem">
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
        <div className="newAdminItem">
          <label>zipCode</label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="zipCode"
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
        </div>
        <div className="newAdminItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="newAdminItem">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="newAdminItem">
          <label>Gender</label>
          <div className="newAdminGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <button className="newAdminButton">Create</button>
      </form>
    </div>
  );
}
