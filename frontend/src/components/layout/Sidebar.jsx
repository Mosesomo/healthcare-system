import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "block py-2 px-4 bg-blue-600 rounded" 
                  : "block py-2 px-4 hover:bg-gray-700 rounded"
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
              to="/clients" 
              className={({ isActive }) => 
                isActive 
                  ? "block py-2 px-4 bg-blue-600 rounded" 
                  : "block py-2 px-4 hover:bg-gray-700 rounded"
              }
            >
              Clients
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
              to="/programs" 
              className={({ isActive }) => 
                isActive 
                  ? "block py-2 px-4 bg-blue-600 rounded" 
                  : "block py-2 px-4 hover:bg-gray-700 rounded"
              }
            >
              Health Programs
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;