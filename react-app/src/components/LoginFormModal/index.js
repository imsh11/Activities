import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demo = async (e) => {
    e.preventDefault()
    const data = await dispatch(login('demo@aa.io', 'password'))
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }

  return (
    <div className="login-main">
      <form className=".signup" onSubmit={handleSubmit}>
        {errors.length ?
        <div className="login-error">
          <div style={{color: 'red'}}><b>There was a problem</b></div>
            <ul>
            {errors.map((error, idx) => (
              <div className="">
                {/* console.log({idx}) */}
                <li key={idx} style={{color: 'red'}}>{error}</li>
              </div>
            ))}
          </ul>
        </div>:
        <div></div>
        }
    <div className="login-form-content">
      <div className="login-main-heading">Log In</div>
        <div className="login-email">
            <label>
          <div className="login-email-title">Email</div>
          <div className="login-email-input">
            <input
            id="email"
            className="login-email-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>
          </label>
        </div>
        <div className="login-email">
          <label>
          <div className="login-email-title">Password</div>
          <div className="login-password-input">
              <input
              id="password"
              className="login-email-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>

          </label>
        </div>
        <div className="login-btn-div">
            <div className="login-btn-page">
            <button className="login-btn" type="submit">Log In</button>
            </div>
            <div className="login-btn-page">
            <button className="login-btn" onClick={demo}>Demo User</button>
            </div>
        </div>
    </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
