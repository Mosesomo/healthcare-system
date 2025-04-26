// components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg font-jost">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span>HealthCare IS</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <button className="relative p-1 rounded-full hover:bg-blue-700/50 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
          </button>
          
          <div className="flex items-center gap-3 border-l pl-6 border-blue-400">
            <div className="bg-blue-800 rounded-full p-2">
              <User size={18} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Dr. John Doe</p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
            <button className="ml-2 p-2 rounded-full hover:bg-blue-700/50 transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;