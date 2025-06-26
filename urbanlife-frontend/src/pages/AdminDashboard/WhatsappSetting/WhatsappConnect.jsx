import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateTemplateModal from '../../../components/AdminDashboard/WhatsApp/CreateTemplateModal'; // Impor modal
import '../../../styles/AdminDashboard/WhatsappSetting/WhatsappConnect.css';

const WhatsappConnect = () => {
  const [templates, setTemplates] = useState([
    // Data templates sama seperti sebelumnya
  ]);

  const [admin1, setAdmin1] = useState('081122334455');
  const [admin2, setAdmin2] = useState('081133224466');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: '',
    textToAdmin: '',
    textToCustomer: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTemplate = () => {
    const newId = (templates.length + 1).toString();
    const newTemplateData = {
      id: newId,
      name: newTemplate.name,
      category: newTemplate.category,
      noAdmin1: admin1,
      noAdmin2: admin2,
      content: newTemplate.textToCustomer,
      status: 'Active',
    };
    setTemplates([...templates, newTemplateData]);
    setNewTemplate({ name: '', category: '', textToAdmin: '', textToCustomer: '' });
    setIsModalOpen(false);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  return (
    <div className="p-4">
      {/* Admin Number Inputs + Button */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2 whitespace-nowrap bg-gray-100 px-16 py-2 rounded-md flex items-center justify-start">
              No Admin 1
            </label>
            <input
              type="text"
              placeholder="No Admin 1"
              className="py-1 px-3 w-32 border border-gray-300 rounded-md focus:outline-cyan-600"
              value={admin1}
              onChange={(e) => setAdmin1(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2 whitespace-nowrap bg-gray-100 px-16 py-2 rounded-md flex items-center justify-start">
              No Admin 2
            </label>
            <input
              type="text"
              placeholder="No Admin 2"
              className="py-1 px-3 w-32 border border-gray-300 rounded-md focus:outline-cyan-600"
              value={admin2}
              onChange={(e) => setAdmin2(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          + New Template
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center">
        <div className="relative w-60 max-w-md">
          <input
            type="text"
            placeholder="Search template"
            className="w-full p-2 pr-10 border border-gray-300 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">No Admin 1</th>
              <th className="px-4 py-2">No Admin 2</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{template.name}</td>
                <td className="px-4 py-2">{template.category}</td>
                <td className="px-4 py-2">{template.noAdmin1}</td>
                <td className="px-4 py-2">{template.noAdmin2}</td>
                <td className="px-4 py-2">{template.content}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {template.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-edit" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <button className="px-2 py-1 bg-blue-500 text-white rounded">1</button>
      </div>

      {/* Modal */}
      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newTemplate={newTemplate}
        onInputChange={handleInputChange}
        onSave={handleAddTemplate}
        admin1={admin1}
        admin2={admin2}
      />
    </div>
  );
};

export default WhatsappConnect;