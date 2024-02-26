import "./login.css";
import React from "react";
import { useState } from "react";
import profile from "./image/profile.png";
import mail from "./image/mail.png";
import pass from "./image/pass.png";
function LoginUi() {
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Done");
    }
  };
  const validate = () => {
    let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const error = {};
    if (!ssn) {
      error.ssn = "SSN is Required";
    } else if (ssn.length === number || ssn.length === 14) {
      error.ssn = "";
    } else {
      error.ssn = " SSN not Matched";
    }
    if (!password) {
      error.password = "Password is Required";
    } else if (password.length < 8) {
      error.password = "Password not Matched";
    } else {
      error.password = "";
    }
    return error;
  };
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>ALZAware</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <img src={mail} alt="mail" className="email" />
                <input
                  type="text"
                  placeholder="SSN"
                  className="name"
                  onChange={(e) => setSSN(e.target.value)}
                />
                {errors.ssn && <div className="error">{errors.ssn}</div>}
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="login-button">
                <button className="kill">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUi;
