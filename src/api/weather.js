// Mock weather API wrapper
export const getWeather = async (country) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        USA: {
          country: "USA",
          temperature: 25,
          humidity: 60,
          windSpeed: 15,
          conditions: "Partly Cloudy",
          alert: {
            type: "none",
            title: "",
            message: "",
            precautions: [],
          },
        },
        India: {
          country: "India",
          temperature: 30,
          humidity: 75,
          windSpeed: 10,
          conditions: "Sunny",
          alert: {
            type: "severe",
            title: "Heatwave Warning",
            message: "Extreme temperatures expected. Stay hydrated.",
            precautions: [
              "Drink plenty of water",
              "Avoid direct sunlight",
              "Wear light clothing",
            ],
          },
        },
        UK: {
          country: "UK",
          temperature: 12,
          humidity: 85,
          windSpeed: 20,
          conditions: "Rainy",
          alert: {
            type: "advisory",
            title: "Heavy Rain Advisory",
            message: "Expect heavy rainfall throughout the day.",
            precautions: [
              "Drive carefully",
              "Carry an umbrella",
              "Avoid flood-prone areas",
            ],
          },
        },
        // Add more mock data for other countries as needed
      };

      const data = mockData[country] || {
        country: country,
        temperature: "N/A",
        humidity: "N/A",
        windSpeed: "N/A",
        conditions: "Unknown",
        alert: {
          type: "none",
          title: "",
          message: "",
          precautions: [],
        },
      };
      resolve(data);
    }, 1000); // Simulate network delay
  });
};
