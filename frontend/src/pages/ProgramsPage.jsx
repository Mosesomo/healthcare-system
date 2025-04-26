// pages/ProgramsPage.js
import React, { useState } from 'react';
import ProgramList from '../components/programs/ProgramList';
import ProgramForm from '../components/programs/ProgramForm';

const ProgramsPage = () => {
  const [showAddProgramForm, setShowAddProgramForm] = useState(false);
  const [programs, setPrograms] = useState([
    {
      id: '1',
      name: 'TB Prevention',
      description: 'Program focused on tuberculosis prevention and early detection.',
      category: 'Infectious Disease',
      startDate: '2023-01-01',
      active: true
    },
    {
      id: '2',
      name: 'HIV Treatment',
      description: 'Comprehensive treatment and support program for HIV patients.',
      category: 'Chronic Disease',
      startDate: '2023-01-15',
      active: true
    },
    {
      id: '3',
      name: 'Malaria Control',
      description: 'Prevention and treatment of malaria in high-risk communities.',
      category: 'Infectious Disease',
      startDate: '2023-02-01',
      active: true
    },
    {
      id: '4',
      name: 'Diabetes Management',
      description: 'Program to help manage diabetes through education and treatment.',
      category: 'Chronic Disease',
      startDate: '2023-03-01',
      active: true
    }
  ]);
  
  const addProgram = (newProgram) => {
    const id = Date.now().toString();
    setPrograms([...programs, { ...newProgram, id }]);
    setShowAddProgramForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Programs</h1>
        <button 
          onClick={() => setShowAddProgramForm(!showAddProgramForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showAddProgramForm ? 'Cancel' : 'Add New Program'}
        </button>
      </div>
      
      {showAddProgramForm ? (
        <ProgramForm addProgram={addProgram} />
      ) : (
        <ProgramList programs={programs} />
      )}
    </div>
  );
};

export default ProgramsPage;