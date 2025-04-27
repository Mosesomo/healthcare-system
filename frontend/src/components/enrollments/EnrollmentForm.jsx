import React, { useState, useEffect } from 'react';
import { ListCheck, FileText, Save, X, Calendar, UserPlus, Loader } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const EnrollmentForm = ({ 
  initialData = null, 
  onCancel = null,
  clientId = null, 
  programId = null, 
  onEnroll = null
}) => {
  const { 
    clients, 
    programs, 
    loading, 
    error,
    addEnrollment,
    updateEnrollment
  } = useAppContext();

  const [formData, setFormData] = useState({
    programId: programId || '',
    clientId: clientId || '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    notes: '',
    status: 'Active'
  });

  const [formError, setFormError] = useState(null);

  // Initialize form with initialData if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        programId: initialData.program,
        clientId: initialData.client,
        enrollmentDate: initialData.enrollmentDate || new Date().toISOString().split('T')[0],
        notes: initialData.notes || '',
        status: initialData.status || 'Active'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.programId) {
      setFormError('Please select a program');
      return;
    }

    if (!formData.clientId) {
      setFormError('Please select a client');
      return;
    }

    if (!formData.enrollmentDate) {
      setFormError('Enrollment date is required');
      return;
    }

    try {
      if (initialData) {
        // Update existing enrollment
        await updateEnrollment(initialData._id, formData);
        toast.success('Enrollment updated successfully');
      } else {
        // Use the onEnroll callback if provided (for parent components to handle)
        if (onEnroll) {
          await onEnroll(formData);
        } else {
          // Otherwise use the context method directly
          await addEnrollment(formData);
          toast.success('Client enrolled successfully');
        }
      }

      // Clear form if not editing
      if (!initialData && !clientId && !onEnroll) {
        setFormData({
          programId: programId || '',
          clientId: '',
          enrollmentDate: new Date().toISOString().split('T')[0],
          notes: '',
          status: 'Active'
        });
      }

      // Close form if callback provided
      if (onCancel) {
        onCancel();
      }
    } catch (err) {
      setFormError(err.message || 'Failed to process enrollment');
      toast.error(err.message || 'Failed to process enrollment');
    }
  };

  // Get active programs
  const activePrograms = programs.filter(p => p.active);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 font-jost">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <UserPlus size={20} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Update Program Enrollment' : 'Enroll Client in Program'}
        </h2>
      </div>
      
      {(error || formError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error || formError}
        </div>
      )}

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Client*</label>
                <div className="relative">
                  <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                    required
                     // Disable if clientId is provided
                  >
                    <option value="">-- Select a client --</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName} ({client.phoneNumber})
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Program*</label>
                <div className="relative">
                  <select
                    name="programId"
                    value={formData.programId}
                    onChange={handleChange}
                    className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                    required
                    disabled={!!programId} // Disable if programId is provided
                  >
                    <option value="">-- Select a program --</option>
                    {activePrograms.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name} ({program.category})
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date*</label>
                <div className="relative">
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={formData.enrollmentDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {initialData && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Dropped">Dropped</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
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
              disabled={loading}
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors disabled:opacity-50"
            disabled={loading || !formData.programId || !formData.clientId}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {initialData ? 'Update Enrollment' : 'Complete Enrollment'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;