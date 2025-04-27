import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { clientAPI, programAPI, enrollmentAPI } from '../utils/api';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [clientsRes, programsRes, enrollmentsRes] = await Promise.all([
          clientAPI.getAll(),
          programAPI.getAll(),
          enrollmentAPI.getAll(),
        ]);
        
        // Debug logging
        console.log("Clients API response:", clientsRes.data);
        console.log("Programs API response:", programsRes.data);
        console.log("Enrollments API response:", enrollmentsRes.data);
        
        // Set state with data
        setClients(clientsRes.data);
        setPrograms(programsRes.data);
        setEnrollments(enrollmentsRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load data. Please try again.");
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Get a single client by ID
  const getClient = useCallback(async (id) => {
    if (!id) {
      console.error("getClient called with invalid ID:", id);
      return null;
    }
    
    try {
      console.log(`Fetching client with ID: ${id}`);
      const response = await clientAPI.get(id);
      console.log("Client API response:", response.data);
      return response.data;
    } catch (err) {
      console.error(`Error fetching client with ID ${id}:`, err);
      return null;
    }
  }, []);

  // Get a single program by ID
  const getProgram = useCallback(async (id) => {
    if (!id) {
      console.error("getProgram called with invalid ID:", id);
      return null;
    }
    
    try {
      console.log(`Fetching program with ID: ${id}`);
      const response = await programAPI.get(id);
      console.log("Program API response:", response.data);
      return response.data;
    } catch (err) {
      console.error(`Error fetching program with ID ${id}:`, err);
      return null;
    }
  }, []);

  // Add a new client
  const addClient = async (clientData) => {
    try {
      const response = await clientAPI.create(clientData);
      setClients([...clients, response.data]);
      toast.success("Client added successfully!");
      return response.data;
    } catch (err) {
      console.error("Error adding client:", err);
      toast.error("Failed to add client");
      throw err;
    }
  };

  // Update an existing client
  const updateClient = async (id, clientData) => {
    try {
      const response = await clientAPI.update(id, clientData);
      setClients(clients.map(client => client.id === id ? response.data : client));
      toast.success("Client updated successfully!");
      return response.data;
    } catch (err) {
      console.error(`Error updating client ${id}:`, err);
      toast.error("Failed to update client");
      throw err;
    }
  };

  // Delete a client
  const deleteClient = async (id) => {
    try {
      await clientAPI.delete(id);
      setClients(clients.filter(client => client.id !== id));
      setEnrollments(enrollments.filter(enrollment => enrollment.client !== id));
      toast.success("Client deleted successfully!");
    } catch (err) {
      console.error(`Error deleting client ${id}:`, err);
      toast.error("Failed to delete client");
      throw err;
    }
  };

  // Add a new program
  const addProgram = async (programData) => {
    try {
      const response = await programAPI.create(programData);
      setPrograms([...programs, response.data]);
      toast.success("Program added successfully!");
      return response.data;
    } catch (err) {
      console.error("Error adding program:", err);
      toast.error("Failed to add program");
      throw err;
    }
  };

  // Update an existing program
  const updateProgram = async (id, programData) => {
    try {
      const response = await programAPI.update(id, programData);
      setPrograms(programs.map(program => program.id === id ? response.data : program));
      toast.success("Program updated successfully!");
      return response.data;
    } catch (err) {
      console.error(`Error updating program ${id}:`, err);
      toast.error("Failed to update program");
      throw err;
    }
  };

  // Delete a program
  const deleteProgram = async (id) => {
    try {
      await programAPI.delete(id);
      setPrograms(programs.filter(program => program.id !== id));
      setEnrollments(enrollments.filter(enrollment => enrollment.program !== id));
      toast.success("Program deleted successfully!");
    } catch (err) {
      console.error(`Error deleting program ${id}:`, err);
      toast.error("Failed to delete program");
      throw err;
    }
  };

  // Add a new enrollment
  const addEnrollment = async (enrollmentData) => {
    try {
      const response = await enrollmentAPI.create(enrollmentData);
      setEnrollments([...enrollments, response.data]);
      toast.success("Enrollment added successfully!");
      return response.data;
    } catch (err) {
      console.error("Error adding enrollment:", err);
      toast.error(err.response?.data?.message || "Failed to add enrollment");
      throw err;
    }
  };
  
  const updateEnrollment = async (id, enrollmentData) => {
    try {
      const response = await enrollmentAPI.update(id, enrollmentData);
      setEnrollments(enrollments.map(enrollment => 
        enrollment._id === id ? response.data : enrollment
      ));
      toast.success("Enrollment updated successfully!");
      return response.data;
    } catch (err) {
      console.error(`Error updating enrollment ${id}:`, err);
      toast.error(err.response?.data?.message || "Failed to update enrollment");
      throw err;
    }
  };

  // Delete an enrollment
  const deleteEnrollment = async (id) => {
    try {
      await enrollmentAPI.delete(id);
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      toast.success("Enrollment deleted successfully!");
    } catch (err) {
      console.error(`Error deleting enrollment ${id}:`, err);
      toast.error("Failed to delete enrollment");
      throw err;
    }
  };

  // Get all enrollments (can be filtered by client ID)
  const getEnrollments = useCallback(async (clientId = null) => {
    try {
      if (enrollments.length && !loading) {
        return clientId 
          ? enrollments.filter(enrollment => enrollment.client === clientId)
          : enrollments;
      }
      
      // Otherwise fetch from API
      const response = await enrollmentAPI.getAll();
      const fetchedEnrollments = response.data;
      
      // Update state with all enrollments
      setEnrollments(fetchedEnrollments);
      
      // Return filtered by client ID if provided
      return clientId 
        ? fetchedEnrollments.filter(enrollment => enrollment.client === clientId)
        : fetchedEnrollments;
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      throw err;
    }
  }, [enrollments, loading]);

  return (
    <AppContext.Provider value={{
      clients,
      programs,
      enrollments,
      getEnrollments,
      loading,
      error,
      getClient,
      getProgram,
      addClient,
      updateClient,
      deleteClient,
      addProgram,
      updateProgram,
      deleteProgram,
      addEnrollment,
      updateEnrollment,
      deleteEnrollment,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);