// Utility to transform API response to the format expected by WeatherCard component

/**
 * Converts wind degree (0-360) to compass direction abbreviation
 * @param {number} degree - Wind direction in degrees (0-360)
 * @returns {string} - Compass direction (N, NE, E, SE, S, SW, W, NW)
 */
function degreeToDirection(degree) {
	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const index = Math.round(degree / 45) % 8;
	return directions[index];
}

/**
 * Gets weather condition text based on cloud coverage and other factors
 * @param {number} cloud - Cloud coverage percentage (0-100)
 * @param {number} humidity - Humidity percentage
 * @param {number} precip_mm - Precipitation in mm
 * @returns {string} - Condition description
 */
function getConditionText(cloud, humidity, precip_mm) {
	if (precip_mm > 0) {
		if (precip_mm > 5) return "Heavy Rain";
		return "Rain";
	}
	if (cloud > 75) return "Cloudy";
	if (cloud > 50) return "Partly Cloudy";
	if (cloud > 25) return "Mostly Sunny";
	return "Sunny";
}

/**
 * Gets emoji icon based on condition
 * @param {string} condition - Weather condition text
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - Emoji icon
 */
function getConditionIcon(condition, isDay) {
	const lower = condition.toLowerCase();
	if (lower.includes("rain") || lower.includes("shower")) return "🌧️";
	if (lower.includes("cloudy")) return isDay ? "⛅" : "☁️";
	if (lower.includes("sunny") || lower.includes("clear")) return isDay ? "☀️" : "🌙";
	if (lower.includes("storm")) return "⛈️";
	return isDay ? "🌤️" : "🌙";
}

/**
 * Estimates rain chance based on humidity and cloud coverage
 * @param {number} humidity - Humidity percentage
 * @param {number} cloud - Cloud coverage percentage
 * @returns {number} - Estimated rain chance (0-100)
 */
function estimateRainChance(humidity, cloud) {
	// Simple heuristic: higher humidity + more clouds = higher rain chance
	return Math.min(100, Math.round((humidity * 0.4) + (cloud * 0.6)));
}

/**
 * Transforms API response to WeatherCard-compatible format
 * @param {Object} apiResponse - Raw API response
 * @returns {Object} - Transformed data object
 */
export function transformApiResponse(apiResponse) {
	if (!apiResponse || !apiResponse.location || !apiResponse.current) {
		throw new Error("Invalid API response structure");
	}

	const { location, current } = apiResponse;
	const cloud = current.cloud || 0;
	const condition = getConditionText(cloud, current.humidity, current.precip_mm || 0);
	const isDay = current.is_day !== undefined ? current.is_day === 1 : true;

	return {
		name: location.name,
		temp: Math.round(current.temp_c),
		feels_like: Math.round(current.feelslike_c),
		humidity: current.humidity,
		wind: {
			speed: Math.round(current.wind_kph * 10) / 10, // Round to 1 decimal
			dir: degreeToDirection(current.wind_degree || 0),
		},
		rainChance: estimateRainChance(current.humidity, cloud),
		condition: condition,
		sunrise: "N/A", // API doesn't provide this in current response
		sunset: "N/A", // API doesn't provide this in current response
		weekSummary: [], // API doesn't provide this in current response
		icon: getConditionIcon(condition, isDay),
		// Store additional API data for potential future use
		_meta: {
			region: location.region,
			country: location.country,
			lastUpdated: current.last_updated,
			cloud: cloud,
			precip_mm: current.precip_mm || 0,
		},
	};
}

/**
 * Fetches weather data from API
 * @param {string} query - City or location name to search
 * @param {string} apiKey - API key (optional, can be set via env var)
 * @param {string} baseUrl - API base URL (optional, defaults to weather API)
 * @returns {Promise<Object>} - Transformed weather data
 */
export async function fetchWeatherData(query, apiKey = null, baseUrl = null) {
	if (!query || !query.trim()) {
		throw new Error("Query is required");
	}

	// Default to a weather API endpoint (you'll need to replace with your actual API)
	const API_KEY = apiKey || import.meta.env.VITE_API_KEY || "";
	const BASE_URL = baseUrl || import.meta.env.VITE_WEATHER_URL || "https://api.weatherapi.com/v1/current.json";

	if (!API_KEY && !baseUrl) {
		throw new Error("API key or custom base URL is required. Set VITE_API_KEY and VITE_WEATHER_URL in .env");
	}

	// If baseUrl is provided without API_KEY, assume it's a custom endpoint that handles auth differently
	const url = API_KEY 
		? `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`
		: `${BASE_URL}?q=${encodeURIComponent(query)}`;

	try {
		const response = await fetch(url);
		
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error?.message || `API error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return transformApiResponse(data);
	} catch (error) {
		if (error instanceof TypeError && error.message.includes("fetch")) {
			throw new Error("Network error: Could not reach the weather API");
		}
		throw error;
	}
}

/**
 * Note: transformApiResponse is already exported above.
 * You can import it like: import { transformApiResponse } from './utils/apiAdapter';
 * 
 * Example usage if calling API manually:
 * const response = await fetch('https://your-api.com/weather?q=Mumbai');
 * const apiData = await response.json();
 * const transformed = transformApiResponse(apiData);
 */

