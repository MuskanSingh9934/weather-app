import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/weather.css";
import mockData from "../data/mockData";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherData, transformApiResponse } from "../utils/apiAdapter";


export default function LandingPage() {
	const [q, setQ] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleSearch(e) {
		e.preventDefault();
		const term = (q || "").trim();
		if (!term) {
			setResult(null);
			setMessage("Please enter a city or society to search.");
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);
		setResult(null);
		setMessage("Searching...");

		try {
			// Get API configuration from environment variables
			const API_KEY = import.meta.env.VITE_API_KEY;
			const API_URL = import.meta.env.VITE_WEATHER_URL;

			let data;

			// Try to use API if configured
			if (API_KEY && API_URL) {
				// Call the API with the search term
				data = await fetchWeatherData(term, API_KEY, API_URL);
				setResult({ name: data.name, data });
				setMessage(`Showing result for "${data.name}"`);
			} else if (API_URL) {
				// If only URL is provided (no key needed)
				data = await fetchWeatherData(term, null, API_URL);
				setResult({ name: data.name, data });
				setMessage(`Showing result for "${data.name}"`);
			} else {
				// Fallback to mock data when API not configured
				const mockKey = term.toLowerCase();
				if (mockData[mockKey]) {
					const mock = mockData[mockKey];
					setResult({ name: mock.name, data: mock });
					setMessage(`Showing result for "${mock.name}" (mock data)`);
				} else {
					// If not in mock data, show Green Meadows as fallback
					const fallback = mockData["green meadows"];
					setResult({ name: fallback.name, data: fallback });
					setMessage(`Showing result for "${fallback.name}" (mock data)`);
				}
			}
		} catch (err) {
			console.error("Weather fetch error:", err);
			setError(err.message || "Failed to fetch weather data");
			setMessage("Error loading weather data");
			
			// Fallback to mock data on error
			const fallback = mockData["green meadows"];
			setResult({ name: fallback.name, data: fallback });
			setMessage(`Showing mock data for "${fallback.name}" (API unavailable)`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="bg-gray-100 h-screen"
		
		>
			<nav className="wa-brand" aria-label="Top navigation">
				<div className="wa-brand-inner">
					<div className="wa-brand-name">MeghaSutra</div>
					
				</div>
			</nav>
			<div className="wa-hero" role="main"
			style={{backdropFilter: "blur(1px)",}}>
			
					<h1 className="wa-hero-title">Discover the weather in <br/>every city you go</h1>
					<p className="wa-hero-sub">Search for a city or society to view live conditions.</p>
					<form className="wa-hero-search" onSubmit={handleSearch} aria-label="Landing search">
						<div className="wa-pill" role="group" aria-label="Search">
							<input
								type="text"
								placeholder="Search for a city"
								aria-label="Search for a city"
								value={q}
								onChange={(e) => setQ(e.target.value)}
							/>
							<button type="submit" aria-label="Search">
								Search
							</button>
						</div>
					</form>
					<div aria-live="polite" className="wa-result-message">
						{message}
						{error && (
							<span style={{ color: "var(--danger)", display: "block", marginTop: 4 }}>
								{error}
							</span>
						)}
					</div>
					{loading && (
						<div style={{ textAlign: "center", marginTop: 16, color: "var(--text-muted-light)" }}>
							Loading weather data...
						</div>
					)}
					<div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
						{result && !loading && (
							<div style={{ width: "min(720px, 100%)" }}>
								<WeatherCard name={result.name} data={result.data} />
							</div>
						)}
					</div>
			</div>
		</div>
	);
}
