import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute w-full top-0 z-10 flex justify-between items-center p-4">
      <div className="text-lg font-bold text-gray-800">NOZY</div>

      <div className="flex items-center space-x-1 bg-white rounded-full p-1 shadow-md">
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          HOME
        </Link>
        <Link
          to="/about"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          ABOUT
        </Link>
        <Link
          to="/features"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          FEATURES
        </Link>
        <Link
          to="/pricing"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          PRICING
        </Link>
        <Link
          to="/news"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          NEWS
        </Link>
      </div>

      <button className="px-5 py-2 bg-black text-white text-sm rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200">
        Join Beta
      </button>
    </nav>
  );
};

export default Navbar;
