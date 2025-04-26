import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ClientDetail from '../components/clients/ClientDetail';
import EnrollmentForm from '../components/enrollments/EnrollmentForm';

const ClientProfilePage = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  
  // Static data for now
  useEffect(() => {
    // Simulate fetching client data
    const clientData = {
      id: id,
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
    };
    
    // Simulate fetching enrollments
    const enrollmentsData = [
      {
        id: '1',
        program: { id: '1', name: 'TB Prevention' },
        enrollmentDate: '2023-01-15',
        status: 'Active'
      },
      {
        id: '2',
        program: { id: '3', name: 'Malaria Control' },
        enrollmentDate: '2023-03-22',
        status: 'Active'
      }
    ];
    
    // Simulate fetching all programs
    const programsData = [
      { id: '1', name: 'TB Prevention' },
      { id: '2', name: 'HIV Treatment' },
      { id: '3', name: 'Malaria Control' },
      { id: '4', name: 'Diabetes Management' }
    ];
    
    setClient(clientData);
    setEnrollments(enrollmentsData);
    setPrograms(programsData);
  }, [id]);
  
  const handleEnrollClient = (programId) => {
    // Static data for now, would make API call in real implementation
    const selectedProgram = programs.find(p => p.id === programId);
    
    if (selectedProgram) {
      const newEnrollment = {
        id: Date.now().toString(),
        program: selectedProgram,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      
      setEnrollments([...enrollments, newEnrollment]);
      setShowEnrollForm(false);
    }
  };
  
  if (!client) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/clients" className="text-blue-600 hover:underline">&larr; Back to Clients</Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Profile: {client.firstName} {client.lastName}</h1>
        <button 
          onClick={() => setShowEnrollForm(!showEnrollForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showEnrollForm ? 'Cancel' : 'Enroll in Program'}
        </button>
      </div>
      
      {showEnrollForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Enroll in Health Program</h2>
          <EnrollmentForm 
            programs={programs.filter(p => !enrollments.some(e => e.program.id === p.id))}
            onEnroll={handleEnrollClient}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ClientDetail client={client} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Enrolled Programs</h2>
          
          {enrollments.length === 0 ? (
            <p>Not enrolled in any programs.</p>
          ) : (
            <div>
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{enrollment.program.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      enrollment.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </p>
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