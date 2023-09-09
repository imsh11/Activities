import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validation, setValidation] = useState({})

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {}

    if(firstName.length < 3 || firstName.length > 10) errors['firstName'] = 'firstName require atleast 3 or less than 10 words'
    if(lastName.length < 3 || lastName.length > 10) errors['lastName'] = 'lastName require atleast 3 or less than 10 words'
    if(!email.includes('@')) errors['email'] = 'Provide a valid email'
    if(password.length < 8) errors['password'] = 'Password must have atleast 8 characters'
		if(username.length < 3 || username.length > 10) errors['username'] = 'username require atleast 3 or less than 10 words'
		if(password !== confirmPassword) errors['confirmPassword'] = "Confirm Password field must be the same as the Password field"

    if(Object.values(errors).length){
      setValidation(errors)
      return alert('try again please')
    }

    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password, firstName, lastName));
        setValidation({})
        
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
    <div className="login-main-page">
    <div className="login-main">
      <form className="signup-form" onSubmit={handleSubmit}>
        {errors.length ?
        <div className="login-error">
          <div style={{color: 'red'}}>
            <b>There was a problem with Sign Up</b>
          </div>
          <ul>
            {errors.map((error, idx) => (
            <li key={idx} style={{color: 'red'}}>{error}</li>))}
          </ul>
        </div>:
        <div></div>
        }
      <div className="login-form-content">
        <div className="login-main-heading">Sign Up</div>
        <div className="login-email">
          <label>
            <div className="login-email-title">FirstName</div>
            <div className="login-email-input">
              <input
                id="firstName"
                className="login-email-field"
                type="text"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                />
                {
                  validation.firstName && (
                    <div style={{color: 'red', fontStyle: 'italic'}}>
                      {validation.firstName}
                    </div>
                  )
                }
            </div>
          </label>
        </div>
        <div className="login-email">
          <label>
            <div className="login-email-title">LastName</div>
            <div className="login-email-input">
              <input
                id="lastName"
                className="login-email-field"
                type="text"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                />
                {
                  validation.lastName && (
                    <div style={{color: 'red', fontStyle: 'italic'}}>
                      {validation.lastName}
                    </div>
                  )
                }
            </div>
          </label>
        </div>
        <div className="login-email">
          <label>
            <div className="login-email-title">Email</div>
            <input
              id="email"
              className="login-email-field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {
              validation.email && (
                <div style={{color: 'red', fontStyle: 'italic'}}>
                  {validation.email}
                </div>
              )
            }
          </label>
        </div>
        <div className="login-email">
          <label>
            <div className="login-email-title">Username</div>
            <input
              id="username"
              className="login-email-field"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {
              validation.username && (
                <div style={{color: 'red', fontStyle: 'italic'}}>
                  {validation.username}
                </div>
              )
            }
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
              {
                validation.password && (
                  <div style={{color: 'red', fontStyle: 'italic'}}>
                    {validation.password}
                  </div>
                )
              }
            </div>
          </label>
        </div>
        <div className="login-email">
          <label>
            <div className="login-email-title">Confirm Password</div>
            <div>
              <input
                id="password"
                className="login-email-field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {
                validation.confirmPassword && (
                  <div style={{color: 'red', fontStyle: 'italic'}}>
                    {validation.confirmPassword}
                  </div>
                )
              }
            </div>
          </label>
        </div>
        <div className="login-btn-div">
          <div className="login-btn-page">
            <button type="submit" className="login-btn">Sign Up</button>
          </div>
        </div>
      </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default SignupFormPage;
