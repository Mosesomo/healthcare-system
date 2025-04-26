// components/enrollments/EnrollmentForm.js
import React, { useState } from 'react';
import { ListCheck, FileText, Save, X, Calendar, UserPlus } from 'lucide-react';

const EnrollmentForm = ({ programs, clients, onEnroll, initialData = null, onCancel = null }) => {
  const [formData, setFormData] = useState(initialData || {
    programId: '',
    clientId: '',  // Added in case selecting a client is needed
    startDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(formData);
    
    // Clear form if not editing
    if (!initialData) {
      setFormData({
        programId: '',
        clientId: '',
        startDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 font-jost">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <UserPlus size={20} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Update Program Enrollment' : 'Enroll in Health Program'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Enrollment Details Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <ListCheck size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Enrollment Details</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Program</label>
                <div className="relative">
                  <select
                    name="programId"
                    value={formData.programId}
                    onChange={handleChange}
                    className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                    required
                  >
                    <option value="">-- Select a program --</option>
                    {programs && programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* If client selection is needed, uncomment this */}
              {clients && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
                  <div className="relative">
                    <select
                      name="clientId"
                      value={formData.clientId}
                      onChange={handleChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                      required
                    >
                      <option value="">-- Select a client --</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.firstName} {client.lastName}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FileText size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Additional Notes</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows="4"
              placeholder="Enter any special instructions or goals for this enrollment"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
            disabled={!formData.programId}
          >
            <Save size={16} className="mr-2" />
            {initialData ? 'Update Enrollment' : 'Complete Enrollment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;