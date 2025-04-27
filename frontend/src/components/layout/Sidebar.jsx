import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Calendar, Settings, HelpCircle, FileText } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/clients', name: 'Clients', icon: <Users size={18} /> },
    { path: '/programs', name: 'Health Programs', icon: <Activity size={18} /> },
    { path: '/reports', name: 'Reports', icon: <FileText size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm h-screen font-jost mt-12">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium text-gray-800">Healthcare IS</h2>
        <p className="text-xs text-gray-500">Management Portal</p>
      </div>
      
      <nav className="py-4">
        <div className="px-4 mb-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="px-3 py-1">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive 
                    ? "flex items-center gap-3 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium transition-colors" 
                    : "flex items-center gap-3 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                }
                end={item.path === '/'}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="px-4 mt-8 mb-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">System</p>
        </div>
        <ul>
          <li className="px-3 py-1">
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                isActive 
                  ? "flex items-center gap-3 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium transition-colors" 
                  : "flex items-center gap-3 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              }
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto p-4 border-t mx-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Contact Support</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;