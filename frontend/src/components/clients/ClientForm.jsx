import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { User, Phone, FileText, Calendar, Save, UserCheck, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ClientForm = ({ addClient, initialData = null, onCancel = null }) => {
  const { id } = useParams();
  const { updateClient, getClient } = useAppContext();
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: {
      city: '',
      state: '',
      zipCode: ''
    },
    medicalHistory: ''
  });

  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load client data if editing via URL parameter
  useEffect(() => {
    if (id && id !== 'new') {
      const client = getClient(id);
      if (client) {
        setFormData(client);
      }
    }
  }, [id, getClient]);

  // Load client data if editing via props
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setFormError('First and last name are required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.gender) {
      setFormError('Gender is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.phoneNumber) {
      setFormError('Phone number is required');
      setIsSubmitting(false);
      return;
    }

    try {
      if (initialData && initialData._id) {
        // Update existing client
        await updateClient(initialData._id, formData);
      } else {
        // Add new client
        await addClient(formData);
      }

      // Clear form if not editing
      if (!initialData) {
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          phoneNumber: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          },
          medicalHistory: ''
        });
      }

      // Call onCancel to close the form if provided
      if (onCancel) {
        onCancel();
      }
    } catch (err) {
      setFormError(err.message || 'Failed to save client');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 font-jost">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <UserCheck size={20} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Update Client Information' : 'Register New Client'}
        </h2>
      </div>
      
      {(formError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <User size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Personal Information</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter last name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white pr-10"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pl-10"
                    placeholder="(123) 456-7890"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Medical History Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FileText size={16} className="text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Medical Information</h3>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows="4"
              placeholder="Enter any relevant medical history, conditions, allergies, etc."
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
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData ? 'Updating...' : 'Registering...'}
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {initialData ? 'Update Client' : 'Register Client'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;