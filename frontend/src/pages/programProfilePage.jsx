import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProgramDetail from '../components/programs/ProgramDetail';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ProgramProfilePage = () => {
  const { id } = useParams();
  const { 
    getProgram, 
    getEnrollments,
    clients,
    updateProgram,
    loading,
    error
  } = useAppContext();

  const [program, setProgram] = useState(null);
  const [programEnrollments, setProgramEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programData = await getProgram(id);
        setProgram(programData);
        
        // Get all enrollments and filter for this program
        const enrollmentRecords = await getEnrollments();
        const filteredEnrollments = enrollmentRecords.filter(e => e.program === id);
        setProgramEnrollments(filteredEnrollments);
      } catch (err) {
        toast.error(`Failed to load program data: ${err.message}`);
      }
    };

    fetchData();
  }, [id, getProgram, getEnrollments]);

  const handleUpdateProgram = async (updatedData) => {
    try {
      const updatedProgram = await updateProgram(id, updatedData);
      setProgram(updatedProgram);
      toast.success('Program information updated successfully!');
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    }
  };

  if (loading && !program) {
    return <div className="text-center py-8">Loading program data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading program: {error}
      </div>
    );
  }

  if (!program) {
    return <div className="text-center py-8">Program not found</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link 
          to="/programs" 
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Programs
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Program Profile: {program.name}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgramDetail 
            program={program} 
            onUpdate={handleUpdateProgram} 
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Enrolled Clients
          </h2>
          
          {loading && !programEnrollments.length ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : programEnrollments.length === 0 ? (
            <p className="text-gray-500">No clients enrolled in this program</p>
          ) : (
            <div className="space-y-4">
              {programEnrollments.map(enrollment => {
                const client = clients.find(c => c._id === enrollment.client);
                return (
                  <div 
                    key={enrollment._id} 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramProfilePage;