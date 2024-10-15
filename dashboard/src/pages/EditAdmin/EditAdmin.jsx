import React, { useState, useContext } from "react";
import axios from "axios";
import * as yup from "yup";
import "./editAdmin.css";
import TokenContext from "../Token/TokenContext.js";

// Define Yup validation schema
const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"), // You can add more validations like length, complexity, etc.
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

export default function EditAdmin() {
  const { token } = useContext(TokenContext);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

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
          "http://alzaware.runasp.net/api/Admin/ChangePassword",
          {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isSuccess) {
          alert("Password updated successfully");
          setForm({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } else {
          alert("Password update failed");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert("An error occurred while updating the password");
      }
    }
  };

  return (
    <div className="editAdmin">
      <h1 className="editAdminTitle">Change Password</h1>
      <form className="editAdminForm" onSubmit={handleSubmit}>
        <div className="editAdminItem">
          <label>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
          />
          {errors.oldPassword && <p className="error">{errors.oldPassword}</p>}
        </div>

        <div className="editAdminItem">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
          />
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>

        <div className="editAdminItem">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
          />
          {errors.confirmNewPassword && (
            <p className="error">{errors.confirmNewPassword}</p>
          )}
        </div>

        <button className="editAdminButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
