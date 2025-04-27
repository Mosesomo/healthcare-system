import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Phone, MapPin, Heart, Calendar, Mail, Clock, Activity,
  Edit, Trash2, ChevronLeft, Printer, UserPlus, CheckCircle
} from 'lucide-react';

const ClientDetail = ({ client, onDelete, onEditClient }) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const handleEdit = () => {
    const clientToEdit = { ...client };
    
    delete clientToEdit.gender;
    delete clientToEdit.dateOfBirth;
    
    onEditClient(clientToEdit);
  };
  
  return (
    <div className="font-jost">
      {/* Header with actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link 
            to="/clients" 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Client Profile</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-2 border border-blue-300 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button 
            onClick={() => onDelete && onDelete(client._id)} 
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
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              {client.firstName?.charAt(0) || ''}{client.lastName?.charAt(0) || ''}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{client.firstName} {client.lastName}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                  client.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                  client.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {client.gender}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {calculateAge(client.dateOfBirth)} years old
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Client since {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <User size={16} className="mr-2 text-blue-600" />
                Contact Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Phone size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-800">{client.phoneNumber || 'Not provided'}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-800">{client.email || 'Not provided'}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="mr-2 mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-800">{new Date(client.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </li>
              </ul>
            </div>
          
            {/* Address Information */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin size={16} className="mr-2 text-blue-600" />
                Address Information
              </h3>
              {client.address && (client.address.street || client.address.city) ? (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">
                    {client.address.street && <span className="block">{client.address.street}</span>}
                    {client.address.city && (
                      <span className="block">
                        {client.address.city}
                        {client.address.state && `, ${client.address.state}`}
                        {client.address.zipCode && ` ${client.address.zipCode}`}
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No address provided</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Side Cards sections are unchanged */}
        <div className="space-y-6">
          {/* Medical History Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
              <Heart size={16} className="mr-2 text-blue-600" />
              Medical History
            </h3>
            <div className="text-gray-800">
              {client.medicalHistory ? (
                <p>{client.medicalHistory}</p>
              ) : (
                <p className="text-gray-500 italic">No medical history recorded</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link 
                to={`/clients/${client.id}/medical`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <Activity size={14} className="mr-1" />
                View full medical records
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;