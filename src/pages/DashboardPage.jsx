import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import WeatherCard from "../components/WeatherCard";
import AlertBanner from "../components/AlertBanner";
import { getWeather } from "../api/weather"; // Mock API

const DashboardPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(user);

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getWeather(user.country);
        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
        <Card>
          <p>Loading weather data...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
        <Card>
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">
          Welcome, {currentUser?.name}!
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          Weather in {currentUser?.country}
        </h2>

        {weatherData?.alert && weatherData.alert.type !== "none" && (
          <AlertBanner alert={weatherData.alert} />
        )}

        <WeatherCard weather={weatherData} />
      </div>
    </div>
  );
};

export default DashboardPage;
