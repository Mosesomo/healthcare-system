// pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, UserCheck, TrendingUp, Calendar, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  // Static data for now
  const stats = {
    clientsCount: 25,
    programsCount: 4,
    activeEnrollmentsCount: 32,
  };

  // Chart data (placeholder)
  const chartData = [
    { month: 'Jan', enrollments: 12 },
    { month: 'Feb', enrollments: 19 },
    { month: 'Mar', enrollments: 15 },
    { month: 'Apr', enrollments: 22 },
    { month: 'May', enrollments: 28 },
    { month: 'Jun', enrollments: 25 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-jost">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Calendar size={16} />
            <span>Today</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Generate Report</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clients</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">{stats.clientsCount}</h2>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-medium">
                <TrendingUp size={14} />
                <span>+3.2% from last month</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
          <Link to="/clients" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            View all clients
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Health Programs</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">{stats.programsCount}</h2>
              <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium">
                <Clock size={14} />
                <span>1 new program this month</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Activity size={24} className="text-green-600" />
            </div>
          </div>
          <Link to="/programs" className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
            View all programs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Enrollments</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">{stats.activeEnrollmentsCount}</h2>
              <div className="flex items-center gap-1 mt-2 text-purple-600 text-xs font-medium">
                <TrendingUp size={14} />
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <UserCheck size={24} className="text-purple-600" />
            </div>
          </div>
          <Link to="/enrollments" className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1">
            Manage enrollments
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Enrollment Trends</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">Monthly</button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg text-sm">Quarterly</button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg text-sm">Yearly</button>
          </div>
        </div>
        <div className="h-64 w-full">
          {/* This is a placeholder for a chart - in a real app, you'd use a chart library */}
          <div className="flex items-end h-48 gap-2 pt-4 border-b border-t border-gray-100">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{ height: `${data.enrollments * 2}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Clients</h2>
              <Link to="/clients" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Programs</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: '1', name: 'Sarah Johnson', enrolledPrograms: 2, status: 'Active' },
                  { id: '2', name: 'Michael Brown', enrolledPrograms: 1, status: 'Active' },
                  { id: '3', name: 'Emma Davis', enrolledPrograms: 3, status: 'Pending' }
                ].map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">{client.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <span className="bg-blue-50 text-blue-700 py-1 px-2 rounded-full text-xs font-medium">
                        {client.enrolledPrograms} Programs
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.status === 'Active' ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1"></span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 mr-1"></span>
                        )}
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/clients/${client.id}`} className="text-blue-600 hover:underline text-sm font-medium">View Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Active Programs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Active Programs</h2>
              <Link to="/programs" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Clients</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: '1', name: 'TB Prevention', enrolledClients: 10, progress: 75 },
                  { id: '2', name: 'HIV Treatment', enrolledClients: 15, progress: 60 },
                  { id: '3', name: 'Malaria Control', enrolledClients: 7, progress: 40 }
                ].map(program => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">{program.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <span className="bg-purple-50 text-purple-700 py-1 px-2 rounded-full text-xs font-medium">
                        {program.enrolledClients} Clients
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${program.progress}%` }}></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">{program.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/programs/${program.id}`} className="text-blue-600 hover:underline text-sm font-medium">View Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
        <div className="text-orange-500 mt-1">
          <AlertCircle size={20} />
        </div>
        <div>
          <h3 className="font-medium text-orange-800">Attention Required</h3>
          <p className="text-sm text-orange-700 mt-1">
            5 clients require follow-up for their TB Prevention program. 
            <Link to="/alerts" className="font-medium underline ml-1">
              View alerts
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;