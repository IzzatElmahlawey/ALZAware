import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import "./createAdmin.css";

// Define Yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  ssn: yup
    .string()
    .matches(/^\d{9}$/, "SSN must be 9 digits")
    .required("SSN is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  birthDate: yup.date().required("Birth date is required"),
  zipCode: yup
    .string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Zip code is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
});

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
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
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
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
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
