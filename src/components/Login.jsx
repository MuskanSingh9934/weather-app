import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/weather.css";
import { getUser, setLoggedIn, isLoggedIn } from "../utils/localStorage";

// Login: email only. If matches stored user email, mark as logged-in and go to /weather.
export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		// If already logged-in, redirect to weather screen
		if (isLoggedIn()) {
			navigate("/weather");
		}
	}, [navigate]);

	function onSubmit(e) {
		e.preventDefault();
		setError("");
		const user = getUser();
		if (!user) {
			setError("No account found. Please register first.");
			return;
		}
		const input = (email || "").trim().toLowerCase();
		const saved = (user.email || "").trim().toLowerCase();
		if (input && input === saved) {
			setLoggedIn(true);
			navigate("/weather");
		} else {
			setError("Email does not match our records.");
		}
	}

	return (
		<div className="wa-container" role="main">
			<div className="wa-card" style={{ maxWidth: 480, margin: "0 auto" }}>
				<h1 className="wa-title" style={{ marginBottom: 12 }}>
					Welcome back
				</h1>
				<p className="wa-muted" style={{ marginBottom: 16 }}>
					Sign in with your email to view weather alerts.
				</p>
				<form onSubmit={onSubmit} noValidate>
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="login-email">Email</label>
						<input
							id="login-email"
							type="email"
							className="wa-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
							autoComplete="email"
						/>
					</div>
					{error && (
						<div className="wa-error" role="alert" aria-live="assertive">
							{error}
						</div>
					)}
					<div className="wa-row" style={{ marginTop: 8 }}>
						<button type="submit" className="wa-button">
							Login
						</button>
						<Link to="/register" className="wa-button" role="button" aria-label="Go to register">
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}


