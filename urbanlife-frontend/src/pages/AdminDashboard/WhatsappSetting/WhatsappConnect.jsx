import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/AdminDashboard/WhatsappSetting/WhatsappConnect.css';

const WhatsappConnect = () => {
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Notifikasi pemesanan',
      category: 'Notifikasi',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Terima kasih memesan...',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Notifikasi pembayaran',
      category: 'Notifikasi',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Terima kasih memesan...',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Notifikasi Pengingat sebelum trip',
      category: 'Notifikasi',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Terima kasih memesan...',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Notifikasi Hari-H rental mobil',
      category: 'Notifikasi',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Terima kasih memesan...',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Notifikasi Hari-H rental mobil',
      category: 'Notifikasi',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Terima kasih memesan...',
      status: 'Active',
    },
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex">
            <div className="w-1/2 p-4 space-y-4">
              <h2 className="text-lg font-semibold">Create New Template</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Template Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTemplate.name}
                  onChange={handleInputChange}
                  placeholder="Notifikasi pemesanan"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Category</label>
                <select
                  name="category"
                  value={newTemplate.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                >
                  <option value="">Notifikasi</option>
                  <option value="Notifikasi">Notifikasi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Text to admin</label>
                <textarea
                  name="textToAdmin"
                  value={newTemplate.textToAdmin}
                  onChange={handleInputChange}
                  placeholder="Text to admin"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Text to customer</label>
                <textarea
                  name="textToCustomer"
                  value={newTemplate.textToCustomer}
                  onChange={handleInputChange}
                  placeholder="Text to customer"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
            </div>

            <div className="w-1/2 p-4 bg-gray-50 flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span className="font-semibold">{newTemplate.name || 'Urbanlife'}</span>
              </div>
              <div className="bg-green-100 p-2 rounded-lg max-w-xs">
                <p className="text-green-800">
                  {newTemplate.textToCustomer || 'Terjadi perbaikan sistem malam ini...'}
                </p>
              </div>
              <div className="mt-auto flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
                  onClick={handleAddTemplate}
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappConnect;
