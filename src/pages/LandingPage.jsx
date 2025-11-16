import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/weather.css";
import mockData from "../data/mockData";
import WeatherCard from "../components/WeatherCard";


export default function LandingPage() {
	const [q, setQ] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState("");

	function handleSearch(e) {
		e.preventDefault();
		const term = (q || "").trim();
		if (!term) {
			setResult(null);
			setMessage("Please enter a city or society to search.");
			return;
		}
		// For now, always show "Green Meadows" regardless of input
		const data = mockData["green meadows"];
		setResult({ name: data.name, data });
		setMessage(`Showing result for “${data.name}”`);
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
					</div>
					<div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
						{result && (
							<div style={{ width: "min(720px, 100%)" }}>
								<WeatherCard name={result.name} data={result.data} />
							</div>
						)}
					</div>
			</div>
		</div>
	);
}
