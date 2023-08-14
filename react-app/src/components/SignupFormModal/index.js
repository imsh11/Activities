import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [validation, setValidation] = useState({})
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {}

		if(firstName.length < 3 || firstName.length > 10) errors['firstName'] = 'firstName require atleast 3 or less than 10 words'
		if(lastName.length < 3 || lastName.length > 10) errors['lastName'] = 'lastName require atleast 3 or less than 10 words'
		if(!email.includes('@')) errors['email'] = 'Provide a valid email'
		if(password.length < 8) errors['password'] = 'Please provide atleast 8 characters'
		if(username.length < 3 || username.length > 10) errors['username'] = 'username require atleast 3 or less than 10 words'
		if(password !== confirmPassword) errors['confirmPassword'] = "Confirm Password field must be the same as the Password field"

		if(Object.values(errors).length){
			setValidation(errors)
			return alert('can not submit')
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));

			setValidation({})

			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="signup">
			<h1>Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
				FirstName
				<input
					id="quantity"
					type="text"
					value={firstName}
					required
					onChange={(e) => setFirstName(e.target.value)}
					/>
					{
						validation.firstName && (
							<div style={{color: 'red'}}>
								{validation.firstName}
							</div>
						)
					}
				</label>
				<label>
				LastName
				<input
					id="quantity"
					type="text"
					value={lastName}
					required
					onChange={(e) => setLastName(e.target.value)}
				/>
				{
						validation.lastName && (
							<div style={{color: 'red'}}>
								{validation.lastName}
							</div>
						)
				}
				</label>
				<label>
					Email
					<input
						id = "quantity"
						type="text"
						value={email}
						
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{
						validation.email && (
							<div style={{color: 'red'}}>
								{validation.email}
							</div>
						)
					}
				</label>
				<label>
					Username
					<input
						id="quantity"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					{
						validation.username && (
							<div style={{color: 'red'}}>
								{validation.username}
							</div>
						)
					}
				</label>
				<label>
					Password
					<input
						id="quantity"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{
						validation.password && (
							<div style={{color: 'red'}}>
								{validation.password}
							</div>
						)
					}
				</label>
				<label>
					Confirm Password
					<input
						id = "quantity"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					{
						validation.confirmPassword && (
							<div style={{color: 'red'}}>
								{validation.confirmPassword}
							</div>
						)
					}
				</label>
				<button type="submit" className="button1">Sign Up</button>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
