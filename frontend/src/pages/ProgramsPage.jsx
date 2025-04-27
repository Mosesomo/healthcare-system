import React, { useState, useContext } from 'react';
import ProgramList from '../components/programs/ProgramList';
import ProgramForm from '../components/programs/ProgramForm';
import { useAppContext } from '../context/AppContext';

const ProgramsPage = () => {
  const [showAddProgramForm, setShowAddProgramForm] = useState(false);
  const { programs, addProgram, loading, error } = useAppContext();

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-jost">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Programs</h1>
        <button 
          onClick={() => setShowAddProgramForm(!showAddProgramForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          {showAddProgramForm ? 'Cancel' : 'Add New Program'}
        </button>
      </div>

      {loading && !programs.length ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading programs: {error}
        </div>
      ) : showAddProgramForm ? (
        <ProgramForm 
          addProgram={(programData) => {
            addProgram(programData);
            setShowAddProgramForm(false);
          }} 
          onCancel={() => setShowAddProgramForm(false)}
        />
      ) : (
        <ProgramList programs={programs} />
      )}
    </div>
  );
};

export default ProgramsPage;