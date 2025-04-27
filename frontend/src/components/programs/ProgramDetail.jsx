import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Tag, Calendar, Clock, CheckCircle, Users,
  Edit, Trash2, ChevronLeft, Printer, Activity
} from 'lucide-react';

const ProgramDetail = ({ program, onDelete }) => {
  return (
    <div className="font-jost">
      {/* Header with actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link 
            to="/programs" 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Program Details</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Printer size={16} />
            <span>Print</span>
          </button>
          <Link 
            to={`/programs/edit/${program._id}`}
            className="flex items-center gap-1 px-3 py-2 border border-green-300 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </Link>
          <button 
            onClick={() => onDelete && onDelete(program._id)} 
            className="flex items-center gap-1 px-3 py-2 border border-red-300 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className={`text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold ${
              program.active ? 'bg-green-600' : 'bg-gray-500'
            }`}>
              {program.name?.charAt(0) || 'P'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{program.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                  program.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {program.active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Tag size={14} className="mr-1" />
                  {program.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {program.endDate ? 'Fixed Term' : 'Ongoing'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
              <FileText size={16} className="mr-2 text-blue-600" />
              Description
            </h3>
            <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>{program.description || 'No description provided'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule Information */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar size={16} className="mr-2 text-blue-600" />
                Schedule Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Calendar size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-gray-800">{new Date(program.startDate).toLocaleDateString()}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="text-gray-800">{program.endDate ? new Date(program.endDate).toLocaleDateString() : 'Ongoing'}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-gray-800">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        program.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {program.active ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Program Stats */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <Activity size={16} className="mr-2 text-blue-600" />
                Program Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{program.enrollmentCount || 0}</div>
                  <div className="text-sm text-blue-600">Enrolled Clients</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{program.completionCount || 0}</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">{program.sessionCount || 0}</div>
                  <div className="text-sm text-yellow-600">Sessions</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">{program.staffCount || 0}</div>
                  <div className="text-sm text-purple-600">Staff Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side Cards */}
        <div className="space-y-6">
          {/* Enrolled Clients Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
              <Users size={16} className="mr-2 text-blue-600" />
              Enrolled Clients
            </h3>
            
            {program.enrolledClients && program.enrolledClients.length > 0 ? (
              <ul className="space-y-2">
                {program.enrolledClients.slice(0, 5).map((client, index) => (
                  <li key={index} className="p-2 hover:bg-gray-50 rounded-lg flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium mr-2">
                      {client.firstName?.charAt(0) || ''}{client.lastName?.charAt(0) || ''}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{client.firstName} {client.lastName}</p>
                      <p className="text-xs text-gray-500">
                        Enrolled: {new Date(client.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No clients enrolled</p>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link 
                to={`/programs/${program._id}/clients`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <Users size={14} className="mr-1" />
                View all enrolled clients
              </Link>
            </div>
          </div>
          
          {/* Program Sessions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar size={16} className="mr-2 text-blue-600" />
              Upcoming Sessions
            </h3>
            
            {program.sessions && program.sessions.length > 0 ? (
              <ul className="space-y-3">
                {program.sessions.slice(0, 3).map((session, index) => (
                  <li key={index} className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 text-blue-800 rounded-lg px-2 py-1 text-xs font-medium w-16 text-center">
                      {new Date(session.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium">{session.title}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(session.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No upcoming sessions scheduled</p>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link 
                to={`/programs/${program.id}/sessions`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                View all sessions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;