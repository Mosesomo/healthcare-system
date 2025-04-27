import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Edit, Search, Filter, ChevronDown, ChevronUp, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const ProgramList = ({ programs, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program => {
    return program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           program.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort programs
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'startDate') {
      comparison = new Date(a.startDate) - new Date(b.startDate);
    } else {
      comparison = a[sortField].localeCompare(b[sortField]);
    }
    
    return sortDirection === 'desc' ? comparison * -1 : comparison;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrograms = sortedPrograms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPrograms.length / itemsPerPage);

  // Handle edit program
  const handleEdit = (program) => {
    if (onEdit) {
      onEdit(program);
    }
  };

  // Sort icon component
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={16} className="text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="text-blue-600" /> : 
      <ChevronDown size={16} className="text-blue-600" />;
  };

  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center font-jost border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No Programs Found</h3>
          <p className="text-gray-600 mb-6">There are no health programs registered in the system.</p>
          <Link 
            to="/programs/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Program
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 font-jost">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search programs by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span>Program Name</span>
                  <span className="ml-2"><SortIcon field="name" /></span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  <span>Category</span>
                  <span className="ml-2"><SortIcon field="category" /></span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center">
                  <span>Start Date</span>
                  <span className="ml-2"><SortIcon field="startDate" /></span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('active')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  <span className="ml-2"><SortIcon field="active" /></span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPrograms.map((program) => (
              <tr key={program._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      {program.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{program.name}</p>
                      <p className="text-xs text-gray-500">{program.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                    {program.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(program.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                    program.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {program.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <Link 
                      to={`/programs/${program._id}`} 
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="View Program"
                    >
                      <Eye size={18} />
                    </Link>
                    <button 
                      onClick={() => handleEdit(program)} 
                      className="p-1.5 text-gray-600 hover:bg-gray-50 rounded"
                      title="Edit Program"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete && onDelete(program._id)} 
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Program"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {indexOfLastItem > sortedPrograms.length ? sortedPrograms.length : indexOfLastItem}
            </span>{" "}
            of <span className="font-medium">{sortedPrograms.length}</span> programs
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded border ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded border ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramList;