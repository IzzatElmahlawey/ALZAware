import React, { useState, useContext } from "react";
import axios from "axios";
import "./editAdmin.css";
import TokenContext from "../Token/TokenContext.js";

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

  const validateForm = () => {
    let formErrors = {};

    if (!form.oldPassword) formErrors.oldPassword = "Old password is required";
    if (!form.newPassword) formErrors.newPassword = "New password is required";
    if (form.newPassword !== form.confirmNewPassword)
      formErrors.confirmNewPassword = "Passwords do not match";

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
