import React, { useState } from 'react';
import { CalendarCheck, FileText, Tag, Calendar, Save, X, CheckCircle } from 'lucide-react';

const ProgramForm = ({ addProgram, initialData = null, onCancel = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProgram(formData);
    
    // Clear form if not editing
    if (!initialData) {
      setFormData({
        name: '',
        description: '',
        category: '',
        startDate: '',
        endDate: '',
        active: true
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 font-jost">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <CalendarCheck size={20} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Update Health Program' : 'Create New Health Program'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Program Details Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FileText size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Program Details</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter program name"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  rows="3"
                  placeholder="Enter program description"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="relative">
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pl-10"
                    placeholder="Enter category"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Tag size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Calendar size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Program Schedule</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <div className="relative">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-blue-600 mr-2" />
                    Active Program
                  </div>
                </label>
              </div>
            </div>
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
            type="button"
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
            onClick={() => setFormData({
              name: '',
              description: '',
              category: '',
              startDate: '',
              endDate: '',
              active: true
            })}
          >
            <X size={16} className="mr-2" />
            Clear
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
          >
            <Save size={16} className="mr-2" />
            {initialData ? 'Update Program' : 'Create Program'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;