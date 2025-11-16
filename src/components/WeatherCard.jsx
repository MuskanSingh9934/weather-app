import React, { useState } from "react";
import "../styles/weather.css";

// Displays weather details for a society/location.
export default function WeatherCard({ name, data }) {
	const [expanded, setExpanded] = useState(false);
	if (!data) return null;

	return (
		<section className="wa-card" aria-label={`Weather details for ${name}`}>
			<header className="wa-header">
				<div>
					<h2 className="wa-title">{name}</h2>
					<p className="wa-muted" aria-live="polite">
						{data.condition} • Chance of rain: {data.rainChance}%
					</p>
				</div>
				<div className="wa-icon" aria-hidden="true">
					{data.icon || "🌤️"}
				</div>
			</header>

			<div className="wa-row" role="group" aria-label="Weather metrics">
				<div className="wa-badge" aria-label={`Temperature ${data.temp} degrees Celsius`}>
					<span>🌡️</span>
					<span>{data.temp}°C</span>
				</div>
				<div className="wa-badge" aria-label={`Feels like ${data.feels_like} degrees Celsius`}>
					<span>🤗</span>
					<span>Feels {data.feels_like}°C</span>
				</div>
				<div className="wa-badge" aria-label={`Humidity ${data.humidity} percent`}>
					<span>💧</span>
					<span>Humidity {data.humidity}%</span>
				</div>
				<div className="wa-badge" aria-label={`Wind ${data.wind?.speed} kilometers per hour ${data.wind?.dir}`}>
					<span>🌬️</span>
					<span>
						Wind {data.wind?.speed} km/h {data.wind?.dir}
					</span>
				</div>
			</div>

			<div className="wa-divider" />

			<div className="wa-details">
				<button
					type="button"
					className="wa-details-toggle"
					aria-expanded={expanded}
					onClick={() => setExpanded((v) => !v)}
				>
					{!expanded ? "Hide details" : "More details"}
				</button>

				{!expanded && (
					<div className="wa-grid-3" style={{ marginTop: 8 }}>
						<div className="wa-card">
							<strong>Sunrise</strong>
							<div className="wa-muted">{data.sunrise}</div>
						</div>
						<div className="wa-card">
							<strong>Sunset</strong>
							<div className="wa-muted">{data.sunset}</div>
						</div>
						<div className="wa-card">
							<strong>Summary</strong>
							<div className="wa-muted">Weekly overview</div>
						</div>
						<div className="wa-week" style={{ gridColumn: "1 / -1" }}>
							{(data.weekSummary || []).map((d, idx) => (
								<div key={`${d.day}-${idx}`} className="wa-week-item">
									<div style={{ fontWeight: 600 }}>{d.day}</div>
									<div className="wa-muted" style={{ fontSize: ".9rem" }}>
										{d.cond}
									</div>
									<div>
										{d.high}° / {d.low}°
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}


