import React, { useState, useContext } from "react";
import axios from "axios";
import "./createPatient.css";
import TokenContext from "../Token/TokenContext.js";
import * as yup from "yup";

// Define the validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  ssn: yup
    .string()
    .matches(/^\d{9}$/, "SSN must be 9 digits")
    .required("SSN is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  zipCode: yup
    .string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Zip code is required"),
  birthDate: yup.date().required("Birth date is required"),
  gender: yup.string().required("Gender is required"),
});

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

  // Update the validateForm function to use Yup
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
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="newPatientItem">
          <label>Last Name</label>
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
          />
          {errors.birthDate && <p className="error">{errors.birthDate}</p>}
        </div>
        <div className="newPatientItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="newPatientItem">
          <label>SSN</label>
          <input
            type="text"
            name="ssn"
            placeholder="SSN"
            onChange={handleChange}
          />
          {errors.ssn && <p className="error">{errors.ssn}</p>}
        </div>
        <div className="newPatientItem">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="newPatientItem">
          <label>Street</label>
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="newPatientItem">
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
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
