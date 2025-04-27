import React, { useState } from 'react';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';
import { useAppContext } from '../context/AppContext';

const ClientsPage = () => {
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { clients, addClient, searchClients, loading } = useAppContext();
  
  // Use filtered clients from context or search results
  const filteredClients = searchQuery ? 
    clients.filter(client => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) || 
             client.phoneNumber.includes(searchQuery);
    }) : clients;

  const handleAddClient = (newClient) => {
    addClient(newClient);
    setShowAddClientForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button 
          onClick={() => setShowAddClientForm(!showAddClientForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showAddClientForm ? 'Cancel' : 'Add New Client'}
        </button>
      </div>
      
      {showAddClientForm ? (
        <ClientForm addClient={handleAddClient} />
      ) : (
        <>
          
          {loading ? (
            <p>Loading clients...</p>
          ) : (
            <ClientList clients={filteredClients} />
          )}
        </>
      )}
    </div>
  );
};

export default ClientsPage;