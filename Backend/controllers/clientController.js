// Client controllers
const Client = require('../models/Client');


const registerClient = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, phoneNumber, address, medicalHistory } = req.body;

    const client = await Client.create({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      medicalHistory
    });

    if (client) {
      res.status(201).json(client);
    } else {
      res.status(400);
      throw new Error('Invalid client data');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (client) {
      res.json(client);
    } else {
      res.status(404);
      throw new Error('Client not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (client) {
      client.firstName = req.body.firstName || client.firstName;
      client.lastName = req.body.lastName || client.lastName;
      client.gender = req.body.gender || client.gender;
      client.dateOfBirth = req.body.dateOfBirth || client.dateOfBirth;
      client.phoneNumber = req.body.phoneNumber || client.phoneNumber;
      client.address = req.body.address || client.address;
      client.medicalHistory = req.body.medicalHistory || client.medicalHistory;

      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404);
      throw new Error('Client not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (client) {
      await client.deleteOne();
      res.json({ message: 'Client removed' });
    } else {
      res.status(404);
      throw new Error('Client not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const searchClients = async (req, res) => {
  try {
    const { query } = req.query;
    
    // If there's a search query, use text search
    if (query) {
      const clients = await Client.find({ $text: { $search: query } });
      return res.json(clients);
    } 
    
    // If no query provided, return all clients
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  searchClients
};