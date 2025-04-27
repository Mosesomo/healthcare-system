import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ClientList = ({ clients, onEditClient }) => {
  const { deleteClient } = useAppContext();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
    }
  };

  const handleEdit = (client) => {
    const clientToEdit = { ...client };
  
    delete clientToEdit.gender;
    delete clientToEdit.dateOfBirth;
    
    onEditClient(clientToEdit);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {clients.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No clients found. Add a new client to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client._id}`} className="text-blue-600 hover:underline flex items-center">
                      <User size={16} className="mr-2" />
                      {client.firstName} {client.lastName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="text-red-600 hover:text-red-900 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientList;