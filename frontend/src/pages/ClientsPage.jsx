import React, { useState } from 'react';
import { UserCheck, Search, Plus, RefreshCw, X } from 'lucide-react';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';
import { useAppContext } from '../context/AppContext';

const ClientsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingClient, setEditingClient] = useState(null);
  const { clients, addClient, updateClient, loading, error } = useAppContext();
  
  // Filter clients based on search term
  const filteredClients = searchQuery ? 
    clients.filter(client => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) || 
             client.phoneNumber.includes(searchQuery);
    }) : clients;

  const handleAddClient = async (clientData) => {
    try {
      if (editingClient) {
        await updateClient(editingClient._id, clientData);
      } else {
        await addClient(clientData);
      }
      setShowForm(false);
      setEditingClient(null);
    } catch (err) {
      console.error('Error saving client:', err);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-jost">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UserCheck size={24} className="text-blue-600" />
          Clients
        </h1>
        <button
          onClick={() => {
            setEditingClient(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {showForm ? (
            <>
              <X size={16} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              New Client
            </>
          )}
        </button>
      </div>
      
      {showForm ? (
        <div className="mb-8">
          <ClientForm 
            initialData={editingClient} 
            addClient={handleAddClient}
            onCancel={() => {
              setShowForm(false);
              setEditingClient(null);
            }}
          />
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients by name or phone number..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading && !clients.length ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw size={24} className="animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              Error loading clients: {error}
            </div>
          ) : (
            <ClientList 
              clients={filteredClients} 
              onEditClient={handleEdit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ClientsPage;