import "./login.css";
import React from "react";
import { useState } from "react";
import profile1 from "./image/profile1.png";
import mail from "./image/mail.png";
import pass from "./image/pass.png";
import { useNavigate } from "react-router-dom";

function LoginUi() {
  const navigate = useNavigate();
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  const handleSubmit = (event) => {
    focused ? setFocused(false) : setFocused(true);
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Done");
      navigate("/");
    }
  };
  const validate = () => {
    let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const error = {};
    if (!ssn) {
      error.ssn = "SSN is Required";
    } else if (ssn.length !== number && ssn.length !== 14) {
      error.ssn = " SSN not Matched";
    }
    if (!password) {
      error.password = "Password is Required";
    } else if (password.length < 8) {
      error.password = "Password not Matched";
    }
    if (Object.keys(error).length === 0) {
      navigate("/");
    }
    return error;
  };
  return (
    <div className="main">
      <div className="sub-main">
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
              onChange={(e) => setSSN(e.target.value)}
              onBlur={handleSubmit}
              focused={focused.toString()}
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
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleSubmit}
              focused={focused.toString()}
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
    </div>
  );
}
export default LoginUi;
