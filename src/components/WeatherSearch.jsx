import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/weather.css";
import WeatherCard from "./WeatherCard";
import mockData from "../data/mockData";
import { getUser, isLoggedIn, logout } from "../utils/localStorage";

// Weather search screen shown after login.
export default function WeatherSearch() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const [query, setQuery] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState("");
	const user = useMemo(() => getUser(), []);

	useEffect(() => {
		// Guard route: requires login
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, [navigate]);

	useEffect(() => {
		// Seed initial query from URL (?q=...)
		const initial = (params.get("q") || "").trim();
		if (initial) {
			setQuery(initial);
			// Auto-trigger a search for convenience
			const key = initial.toLowerCase();
			const data = mockData[key];
			if (!data) {
				setResult(null);
				setMessage("No data found. Try another society.");
			} else {
				setResult({ name: data.name || initial, data });
				setMessage(`Showing result for “${data.name || initial}”`);
			}
		}
	}, [params]);

	function handleSearch(e) {
		e.preventDefault();
		const key = (query || "").trim().toLowerCase();
		if (!key) {
			setResult(null);
			setMessage("Please enter a society name to search.");
			return;
		}
		const data = mockData[key];
		if (!data) {
			setResult(null);
			setMessage("No data found. Try another society.");
		} else {
			setResult({ name: data.name || query.trim(), data });
			setMessage(`Showing result for “${data.name || query.trim()}”`);
		}
	}

	function handleLogout() {
		logout();
		navigate("/login");
	}

	return (
		<div className="wa-container" role="main">
			<header className="wa-header" style={{ marginBottom: 16 }}>
				<div>
					<h1 className="wa-title">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
					<p className="wa-muted">Search for your society to view weather details.</p>
				</div>
				<button type="button" className="wa-button wa-button-danger" onClick={handleLogout} aria-label="Logout">
					Logout
				</button>
			</header>

			<form onSubmit={handleSearch} aria-label="Weather search" style={{ marginTop: 8 }}>
				<div className="wa-pill" role="group" aria-label="Society search">
					<input
						id="society"
						placeholder="Enter society name (e.g., Green Meadows)"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						aria-label="Society name"
					/>
					<button type="submit" aria-label="Search">
						Search
					</button>
				</div>
			</form>

			<div aria-live="polite" className="wa-muted" style={{ marginTop: 12 }}>
				{message}
			</div>

			<div style={{ marginTop: 16 }}>
				{result && <WeatherCard name={result.name} data={result.data} />}
			</div>
		</div>
	);
}


