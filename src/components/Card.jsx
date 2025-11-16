import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
