import React from "react";

const AlertBanner = ({ alert }) => {
  if (!alert || alert.type === "none") {
    return null;
  }

  const isSevere = alert.type === "severe";
  const bannerClass = isSevere
    ? "bg-red-500 text-white"
    : "bg-yellow-400 text-gray-800";

  return (
    <div className={`p-4 rounded-lg shadow-md ${bannerClass} mb-4`}>
      <h3 className="text-xl font-bold mb-2">Weather Alert: {alert.title}</h3>
      <p className="mb-2">{alert.message}</p>
      {isSevere && (
        <div className="mt-4 p-3 bg-red-600 rounded-md">
          <h4 className="font-semibold">Safety Precautions:</h4>
          <ul className="list-disc list-inside">
            {alert.precautions.map((p, index) => (
              <li key={index}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertBanner;
