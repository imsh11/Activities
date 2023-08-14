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
    <>
      <h1>Log In</h1>
      <form className=".signup" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color: 'red'}}>{error}</li>
          ))}
        </ul>
        <div>
            <label>
          Email
          <input
            id="quantity"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
        </div>
        <div>
          <label>
          Password
          <input
            id="quantity"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </label>
        </div>
        <div className="btn-div">
            <div>
            <button className="button1 login-btn" type="submit">Log In</button>
            </div>
            <div>
            <button className="button1 login-btn" onClick={demo}>Demo User</button>
            </div>
        </div>

      </form>

    </>
  );
}

export default LoginFormModal;
