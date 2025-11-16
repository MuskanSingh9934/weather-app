import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/weather.css";
import { setUser } from "../utils/localStorage";

// Registration: collects name, location, email; saves to localStorage then routes to login.
export default function Register() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: "", location: "", email: "" });
	const [errors, setErrors] = useState({});

	function validate(values) {
		const next = {};
		if (!values.name.trim()) next.name = "Name is required.";
		if (!values.location.trim()) next.location = "Location is required.";
		if (!values.email.trim()) {
			next.email = "Email is required.";
		} else {
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!re.test(values.email)) next.email = "Enter a valid email address.";
		}
		return next;
	}

	function onChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function onSubmit(e) {
		e.preventDefault();
		const v = validate(form);
		setErrors(v);
		if (Object.keys(v).length > 0) return;
		// Save user; login happens after a separate login step
		setUser({
			name: form.name.trim(),
			location: form.location.trim(),
			email: form.email.trim(),
		});
		navigate("/login");
	}

	return (
		<div className="wa-container" role="main">
			<div className="wa-card" style={{ maxWidth: 520, margin: "0 auto" }}>
				<h1 className="wa-title" style={{ marginBottom: 12 }}>
					Create your account
				</h1>
				<p className="wa-muted" style={{ marginBottom: 16 }}>
					Register to set your location and receive weather alerts.
				</p>

				<form onSubmit={onSubmit} noValidate>
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							name="name"
							className="wa-input"
							value={form.name}
							onChange={onChange}
							placeholder="Jane Doe"
							autoComplete="name"
							required
						/>
						{errors.name && <div className="wa-error" role="alert">{errors.name}</div>}
					</div>

					<div style={{ marginBottom: 12 }}>
						<label htmlFor="location">Location</label>
						<input
							id="location"
							name="location"
							className="wa-input"
							value={form.location}
							onChange={onChange}
							placeholder="City or Area"
							required
						/>
						{errors.location && <div className="wa-error" role="alert">{errors.location}</div>}
					</div>

					<div style={{ marginBottom: 16 }}>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="wa-input"
							value={form.email}
							onChange={onChange}
							placeholder="you@example.com"
							autoComplete="email"
							required
							aria-describedby="email-help"
						/>
						<small id="email-help" className="wa-muted">
							We’ll use this for login only.
						</small>
						{errors.email && <div className="wa-error" role="alert">{errors.email}</div>}
					</div>

					<div className="wa-row">
						<button type="submit" className="wa-button">
							Register
						</button>
						<Link to="/login" className="wa-button" role="button" aria-label="Go to login">
							Back to Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}


