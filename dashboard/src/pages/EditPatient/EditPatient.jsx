import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as yup from "yup"; // Import Yup for validation
import "./editPatient.css";
import TokenContext from "../Token/TokenContext.js";

// Define Yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number is invalid"),
  ssn: yup
    .string()
    .required("SSN is required")
    .matches(/^\d{9}$/, "SSN must be 9 digits"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  zipCode: yup
    .string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be 5 digits"),
  birthDate: yup
    .date()
    .required("Birth date is required")
    .typeError("Invalid date format"),
  gender: yup.string().required("Gender is required"),
});

export default function EditPatient() {
  const { token } = useContext(TokenContext);
  const { id } = useParams();

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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `http://alzaware.runasp.net/api/Patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = async () => {
    try {
      // Use Yup validation schema to validate the form
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({}); // Clear any previous errors if validation passes
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors); // Set validation errors
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
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
          setSuccessMessage("Patient information updated successfully");
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
      {successMessage && <p className="success">{successMessage}</p>}
      <form className="editPatientForm" onSubmit={handleSubmit}>
        <div className="editPatientItem">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
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
            value={form.lastName}
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
            value={form.phone}
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
            value={form.ssn}
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
            value={form.city}
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
            value={form.street}
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
            value={form.zipCode}
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
            value={form.birthDate}
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
        <button type="submit" className="editPatientButton">
          Update
        </button>
      </form>
    </div>
  );
}
