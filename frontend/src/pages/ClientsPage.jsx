// pages/ClientsPage.js
import React, { useState } from 'react';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';

const ClientsPage = () => {
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [clients, setClients] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      gender: 'Female',
      dateOfBirth: '1985-06-15',
      phoneNumber: '555-123-4567',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '90210'
      },
      medicalHistory: 'No significant medical history'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Brown',
      gender: 'Male',
      dateOfBirth: '1978-11-30',
      phoneNumber: '555-987-6543',
      address: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        zipCode: '10001'
      },
      medicalHistory: 'Hypertension'
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Davis',
      gender: 'Female',
      dateOfBirth: '1990-03-22',
      phoneNumber: '555-456-7890',
      address: {
        street: '789 Pine St',
        city: 'Elsewhere',
        state: 'TX',
        zipCode: '75001'
      },
      medicalHistory: 'Asthma'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const addClient = (newClient) => {
    const id = Date.now().toString();
    setClients([...clients, { ...newClient, id }]);
    setShowAddClientForm(false);
  };
  
  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           client.phoneNumber.includes(searchQuery);
  });

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
        <ClientForm addClient={addClient} />
      ) : (
        <>
          <ClientList clients={filteredClients} />
        </>
      )}
    </div>
  );
};

export default ClientsPage;