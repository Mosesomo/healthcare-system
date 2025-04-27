import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ClientDetail from '../components/clients/ClientDetail';
import EnrollmentForm from '../components/enrollments/EnrollmentForm';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { ChevronLeft, Plus, UserCheck, RefreshCw, Calendar, X} from 'lucide-react';

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
        
        const enrollmentRecords = await getEnrollments();
        const filteredEnrollments = enrollmentRecords.filter(e => 
          e.client?._id === id || e.client === id
        );
        setClientEnrollments(filteredEnrollments);
      } catch (err) {
        toast.error(`Failed to load client data: ${err.message}`);
      }
    };

    fetchData();
  }, [id, getClient, getEnrollments]);

  const handleEnrollClient = async (enrollmentData) => {
    try {
      const completeData = {
        ...enrollmentData,
        client: id
      };
      
      await addEnrollment(completeData);
      
      const enrollmentRecords = await getEnrollments();
      const filteredEnrollments = enrollmentRecords.filter(e => 
        e.client?._id === id || e.client === id
      );
      setClientEnrollments(filteredEnrollments);
      
      setShowEnrollForm(false);
      toast.success('Client enrolled successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
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

  const handleEdit = (clientData) => {
    const editableClient = {
      _id: clientData._id,
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      phoneNumber: clientData.phoneNumber,
      email: clientData.email,
      address: clientData.address,
    };

    handleUpdateClient(editableClient);
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
          <ChevronLeft size={16} />
          Back to Clients
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Client Profile: {client?.firstName} {client?.lastName}
        </h1>
        <button 
          onClick={() => setShowEnrollForm(!showEnrollForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
          disabled={loading}
        >
          {showEnrollForm ? (
            <>
              <X size={16} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              Enroll in Program
            </>
          )}
        </button>
      </div>
      
      {showEnrollForm && (
        <div className="mb-8">
          <EnrollmentForm 
            programs={availablePrograms}
            clientId={client?._id}
            onEnroll={handleEnrollClient}
            onCancel={() => setShowEnrollForm(false)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientDetail 
            client={client} 
            onEditClient={handleEdit} 
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserCheck size={20} className="text-blue-600" />
              Enrolled Programs
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {clientEnrollments.length} programs
            </span>
          </div>
          
          {loading && !clientEnrollments.length ? (
            <div className="flex justify-center py-4">
              <RefreshCw size={24} className="animate-spin text-blue-600" />
            </div>
          ) : clientEnrollments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No active enrollments</p>
              <button 
                onClick={() => setShowEnrollForm(true)}
                className="text-blue-600 hover:underline text-sm"
              >
                Enroll in a program
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {clientEnrollments.map(enrollment => {
                const program = programs.find(p => p._id === enrollment.program?._id || p._id === enrollment.program);
                
                return (
                  <div 
                    key={enrollment._id} 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {program?.name || 'Unknown Program'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={14} className="text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                          </p>
                        </div>
                        {enrollment.notes && (
                          <p className="text-sm text-gray-500 mt-2">
                            Notes: {enrollment.notes}
                          </p>
                        )}
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;