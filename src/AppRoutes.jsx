// Example usage:
// Import and render <AppRoutes /> inside your App component, replacing or alongside your existing routes.
// Routes: /register (Register), /login (Login), /weather (WeatherSearch)
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import WeatherSearch from "./components/WeatherSearch";
import LandingPage from "./pages/LandingPage";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}


