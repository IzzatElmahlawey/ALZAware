import "./login.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import profile1 from "./image/profile1.png";
import mail from "./image/mail.png";
import pass from "./image/pass.png";
import TokenContext from "../Token/TokenContext.js";
import * as yup from "yup";

// Define the Yup validation schema
const validationSchema = yup.object().shape({
  ssn: yup.string().required("SSN is required").length(14, "Invalid SSN"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function LoginUi() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const notify = (message, type) => {
    if (type === "success") {
      alert(message);
    } else if (type === "error") {
      alert(message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validate();
    if (isValid) {
      try {
        const response = await fetch(
          "http://alzaware.runasp.net/api/Admin/Login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ssn, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            setToken(data.data);
            notify("Login successful", "success");
            navigate("/");
          } else {
            notify("Login failed", "error");
          }
        } else {
          notify("Login failed", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        notify("An error occurred", "error");
      }
    }
  };

  // Validate form with Yup
  const validate = async () => {
    try {
      await validationSchema.validate({ ssn, password }, { abortEarly: false });
      setErrors({});
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

  return (
    <div className="main">
      <div>
        <img src={profile1} alt="profile" className="profile" />
        <h1 className="aware">ALZAware</h1>
      </div>
      <form onSubmit={handleSubmit} className="homos">
        <h1 className="title">Login</h1>
        <div>
          <img src={mail} alt="mail" className="email" />
          <input
            type="text"
            className="name"
            placeholder="SSN"
            autoComplete="off"
            value={ssn}
            onChange={(e) => setSSN(e.target.value)}
          />
          {errors.ssn && <div className="error">{errors.ssn}</div>}
        </div>
        <div className="second-input">
          <img src={pass} alt="pass" className="email" />
          <input
            type="password"
            className="name"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="login-button">
          <button className="link">Login</button>
        </div>
        <div className="check">
          <input type="checkbox" />
          <label className="remember">Remember me</label>
        </div>
      </form>
    </div>
  );
}

export default LoginUi;
