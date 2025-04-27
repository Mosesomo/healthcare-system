import React, { useState, useEffect } from 'react';
import ProgramList from '../components/programs/ProgramList';
import ProgramForm from '../components/programs/ProgramForm';
import { useAppContext } from '../context/AppContext';

const ProgramsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [programToEdit, setProgramToEdit] = useState(null);
  const { programs, addProgram, updateProgram, loading, error } = useAppContext();

  const handleAddProgram = (programData) => {
    addProgram(programData);
    setShowForm(false);
  };

  const handleEditProgram = (program) => {
    setProgramToEdit(program);
    setShowForm(true);
  };

  const handleUpdateProgram = (programData) => {
    updateProgram(programToEdit._id, programData);
    setProgramToEdit(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setProgramToEdit(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-jost">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Programs</h1>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Add New Program
          </button>
        )}
      </div>

      {loading && !programs.length ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading programs: {error}
        </div>
      ) : showForm ? (
        <ProgramForm 
          addProgram={programToEdit ? handleUpdateProgram : handleAddProgram}
          initialData={programToEdit}
          onCancel={handleCancel}
        />
      ) : (
        <ProgramList 
          programs={programs} 
          onEdit={handleEditProgram}
        />
      )}
    </div>
  );
};

export default ProgramsPage;