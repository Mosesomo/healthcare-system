// components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white font-jost shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a className="text-xl font-bold">Healthcare Information System</a>
        <div>
          <span className="mr-4">Dr. John Doe</span>
          <button className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;