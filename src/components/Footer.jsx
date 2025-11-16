import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2025 WeatherApp. All rights reserved.</p>
        <p>
          <a href="#" className="hover:text-gray-300 mx-2">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" className="hover:text-gray-300 mx-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
