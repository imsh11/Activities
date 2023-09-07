import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = async (e) => {
    e.preventDefault()
    const data = await dispatch(login('demo@aa.io', 'password'))
    if(data) {
      setErrors(data);
    }
  }

  return (
    <div className="login-main-page">
    <div className="login-main">
      <form className="" onSubmit={handleSubmit}>
        {errors.length ?
        <div className="login-error">
          <div style={{color: 'red'}}><b>There was a problem</b></div>
            <ul>
              {errors.map((error, idx) => (
              <li key={idx} style={{color: 'red'}}>{error}</li>
              ))}
            </ul>
        </div> :
        <div></div>
              }
        <div>
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
              <div>
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
              <button type="submit" className="login-btn">Log In</button>
            </div>
            <div className="login-btn-page">
              <button className="login-btn" onClick={demo}>Demo User</button>
            </div>
          </div>
      </div>
      </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
