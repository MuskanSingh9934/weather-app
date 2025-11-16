import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
        No weather data available.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">{weather.country}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg">Temperature:</p>
          <p className="text-xl font-semibold">{weather.temperature}°C</p>
        </div>
        <div>
          <p className="text-lg">Humidity:</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-lg">Wind Speed:</p>
          <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className="text-lg">Conditions:</p>
          <p className="text-xl font-semibold">{weather.conditions}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
