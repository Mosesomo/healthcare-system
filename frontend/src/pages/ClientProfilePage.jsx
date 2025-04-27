import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ClientDetail from '../components/clients/ClientDetail';
import EnrollmentForm from '../components/enrollments/EnrollmentForm';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ClientProfilePage = () => {
  const { id } = useParams();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const { 
    getClient, 
    getEnrollments,
    programs, 
    addEnrollment,
    updateClient,
    loading,
    error
  } = useAppContext();

  const [client, setClient] = useState(null);
  const [clientEnrollments, setClientEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientData = await getClient(id);
        setClient(clientData);
        
        // Get all enrollments and filter for this client
        const enrollmentRecords = await getEnrollments();
        const filteredEnrollments = enrollmentRecords.filter(e => e.client === id);
        setClientEnrollments(filteredEnrollments);
      } catch (err) {
        toast.error(`Failed to load client data: ${err.message}`);
      }
    };

    fetchData();
  }, [id, getClient, getEnrollments]);

  const handleEnrollClient = async (formData) => {
    try {
      // Using formData directly as that's what the API expects
      const newEnrollmentData = {
        ...formData,
        clientId: id // Ensure the client ID is set
      };
      
      await addEnrollment(newEnrollmentData);
      
      // Refresh enrollments after successful enrollment
      const enrollmentRecords = await getEnrollments();
      const filteredEnrollments = enrollmentRecords.filter(e => e.client === id);
      setClientEnrollments(filteredEnrollments);
      
      setShowEnrollForm(false);
      toast.success('Client enrolled successfully!');
    } catch (err) {
      toast.error(`Enrollment failed: ${err.message}`);
    }
  };

  const handleUpdateClient = async (updatedData) => {
    try {
      const updatedClient = await updateClient(id, updatedData);
      setClient(updatedClient);
      toast.success('Client information updated successfully!');
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    }
  };

  if (loading && !client) {
    return <div className="text-center py-8">Loading client data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading client: {error}
      </div>
    );
  }

  if (!client) {
    return <div className="text-center py-8">Client not found</div>;
  }

  // Filter out programs the client is already enrolled in
  const availablePrograms = programs.filter(program => 
    !clientEnrollments.some(enrollment => enrollment.program === program._id)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link 
          to="/clients" 
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Clients
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Client Profile: {client.firstName} {client.lastName}
        </h1>
        <button 
          onClick={() => setShowEnrollForm(!showEnrollForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
          disabled={loading}
        >
          {showEnrollForm ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Enroll in Program
            </>
          )}
        </button>
      </div>
      
      {showEnrollForm && (
        <div className="mb-8">
          <EnrollmentForm 
            programs={availablePrograms}
            clientId={id}
            onEnroll={handleEnrollClient}
            onCancel={() => setShowEnrollForm(false)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientDetail 
            client={client} 
            onUpdate={handleUpdateClient} 
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Enrolled Programs
          </h2>
          
          {loading && !clientEnrollments.length ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : clientEnrollments.length === 0 ? (
            <p className="text-gray-500">No active enrollments</p>
          ) : (
            <div className="space-y-4">
              {clientEnrollments.map(enrollment => (
                <div 
                  key={enrollment._id} 
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {programs.find(p => p.id === enrollment.program)?.name || 'Unknown Program'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      enrollment.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : enrollment.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;