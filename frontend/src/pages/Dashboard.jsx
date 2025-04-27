// pages/Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, UserCheck, TrendingUp, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { clients, programs, enrollments, loading, getClient, getProgram, } = useAppContext();

  const [recentClient, setRecentClients] = useState([]);
  const [activeProgram, setActivePrograms] = useState([]);

  // Load recent clients with full details
  useEffect(() => {
    if (clients.length > 0) {
      const fetchRecentClients = async () => {
        const recent = clients.slice(0, 3).map(async (client) => {
          const fullClient = await getClient(client.id); // Fetch full client details
          return {
            ...fullClient,
            enrolledPrograms: enrollments.filter(e => e.client === client.id).length
          };
        });
        const resolvedClients = await Promise.all(recent);
        setRecentClients(resolvedClients);
      };
      fetchRecentClients();
    }
  }, [clients, enrollments, getClient]);

  // Load active programs with enrollment counts
  useEffect(() => {
    if (programs.length > 0) {
      const fetchActivePrograms = async () => {
        const active = programs.slice(0, 3).map(async (program) => {
          const fullProgram = await getProgram(program.id); // Fetch full program details
          return {
            ...fullProgram,
            enrolledClients: enrollments.filter(e => e.program === program.id).length,
            progress: Math.floor(Math.random() * 50) + 50 // Example progress
          };
        });
        const resolvedPrograms = await Promise.all(active);
        setActivePrograms(resolvedPrograms);
      };
      fetchActivePrograms();
    }
  }, [programs, enrollments, getProgram]);

  // Calculate stats from context data
  const stats = {
    clientsCount: clients.length,
    programsCount: programs.length,
    activeEnrollmentsCount: enrollments.filter(e => e.status === 'Active').length,
  };

  // Get recent clients (last 3)
  const recentClients = [...clients].slice(0, 3).map(client => ({
    id: client.id,
    name: `${client.firstName} ${client.lastName}`,
    enrolledPrograms: enrollments.filter(e => e.client === client.id).length,
    status: 'Active' // Simplified for this example
  }));

  // Get active programs with enrollment counts
  const activePrograms = programs.slice(0, 3).map(program => ({
    id: program.id,
    name: program.name,
    enrolledClients: enrollments.filter(e => e.program === program.id).length,
    progress: Math.floor(Math.random() * 50) + 50 // Random progress for demo
  }));

  // Chart data (placeholder - would ideally use real data over time)
  const chartData = [
    { month: 'Jan', enrollments: Math.floor(Math.random() * 10) + 5 },
    { month: 'Feb', enrollments: Math.floor(Math.random() * 10) + 10 },
    { month: 'Mar', enrollments: Math.floor(Math.random() * 10) + 15 },
    { month: 'Apr', enrollments: Math.floor(Math.random() * 10) + 20 },
    { month: 'May', enrollments: Math.floor(Math.random() * 10) + 25 },
    { month: 'Jun', enrollments: Math.floor(Math.random() * 10) + 20 },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen font-jost flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-jost">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Calendar size={16} />
            <span>Today</span>
          </button>
         
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
                <span>+{Math.floor(Math.random() * 5) + 1}% from last month</span>
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
                <span>{Math.floor(Math.random() * 3) + 1} new program(s) this month</span>
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
                <span>+{Math.floor(Math.random() * 15) + 5}% from last month</span>
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
                {recentClients.map(client => (
                  <tr key={client._id} className="hover:bg-gray-50">
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
                      <Link to={`/clients/${client._id}`} className="text-blue-600 hover:underline text-sm font-medium">View Details</Link>
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
                {activePrograms.map(program => (
                  <tr key={program._id} className="hover:bg-gray-50">
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
                      <Link to={`/programs/${program._id}`} className="text-blue-600 hover:underline text-sm font-medium">View Details</Link>
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
            {Math.floor(Math.random() * 5) + 1} clients require follow-up for their TB Prevention program. 
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