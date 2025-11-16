// Mock weather data keyed by society name (lowercase).
// Search is case-insensitive; keep keys in lowercase for simpler lookup.

const mockData = {
	"green meadows": {
		name: "Green Meadows",
		temp: 28,
		feels_like: 30,
		humidity: 72,
		wind: { speed: 6.4, dir: "NE" },
		rainChance: 40,
		condition: "Partly Cloudy",
		sunrise: "06:12",
		sunset: "18:05",
		weekSummary: [
			{ day: "Mon", high: 30, low: 22, cond: "Sunny" },
			{ day: "Tue", high: 29, low: 21, cond: "Cloudy" },
			{ day: "Wed", high: 27, low: 20, cond: "Rain" },
			{ day: "Thu", high: 28, low: 21, cond: "Partly Cloudy" },
		],
		icon: "⛅",
	},
	"sunrise apartments": {
		name: "Sunrise Apartments",
		temp: 32,
		feels_like: 34,
		humidity: 60,
		wind: { speed: 8.2, dir: "E" },
		rainChance: 20,
		condition: "Sunny",
		sunrise: "06:05",
		sunset: "18:10",
		weekSummary: [
			{ day: "Mon", high: 33, low: 24, cond: "Sunny" },
			{ day: "Tue", high: 34, low: 25, cond: "Sunny" },
			{ day: "Wed", high: 31, low: 23, cond: "Partly Cloudy" },
		],
		icon: "☀️",
	},
	"riverside colony": {
		name: "Riverside Colony",
		temp: 24,
		feels_like: 25,
		humidity: 80,
		wind: { speed: 10.1, dir: "NW" },
		rainChance: 65,
		condition: "Rain",
		sunrise: "06:20",
		sunset: "18:00",
		weekSummary: [
			{ day: "Mon", high: 26, low: 20, cond: "Rain" },
			{ day: "Tue", high: 25, low: 19, cond: "Thunderstorms" },
			{ day: "Wed", high: 24, low: 18, cond: "Showers" },
			{ day: "Thu", high: 26, low: 19, cond: "Cloudy" },
			{ day: "Fri", high: 27, low: 20, cond: "Sunny" },
		],
		icon: "🌧️",
	},
	"oak estate": {
		name: "Oak Estate",
		temp: 19,
		feels_like: 18,
		humidity: 55,
		wind: { speed: 4.8, dir: "S" },
		rainChance: 10,
		condition: "Cloudy",
		sunrise: "06:45",
		sunset: "17:50",
		weekSummary: [
			{ day: "Mon", high: 20, low: 12, cond: "Cloudy" },
			{ day: "Tue", high: 21, low: 13, cond: "Partly Cloudy" },
			{ day: "Wed", high: 18, low: 11, cond: "Windy" },
		],
		icon: "☁️",
	},
};

export default mockData;


