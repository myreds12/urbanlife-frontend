import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/WhatsappSetting/WhatsappConnect.css'; // Tambahkan CSS sesuai kebutuhan

interface Template {
  id: string;
  name: string;
  category: string;
  noAdmin1: string;
  noAdmin2: string;
  content: string;
  status: 'Active' | 'Inactive';
}

interface NewTemplateForm {
  name: string;
  category: string;
  textToAdmin: string;
  textToCustomer: string;
}

const WhatsappConnect: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
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
  const [newTemplate, setNewTemplate] = useState<NewTemplateForm>({
    name: '',
    category: '',
    textToAdmin: '',
    textToCustomer: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTemplate = () => {
    const newId = (templates.length + 1).toString();
    const newTemplateData: Template = {
      id: newId,
      name: newTemplate.name,
      category: newTemplate.category,
      noAdmin1: admin1,
      noAdmin2: admin2,
      content: newTemplate.textToCustomer, // Gunakan text to customer sebagai content sementara
      status: 'Active',
    };
    setTemplates([...templates, newTemplateData]);
    setNewTemplate({ name: '', category: '', textToAdmin: '', textToCustomer: '' });
    setIsModalOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-600 mr-2 whitespace-nowrap bg-gray-100 px-3 py-2 rounded-md">No Admin 1</label>
            <input
              type="text"
              placeholder="No Admin 1"
              className="py-1 px-3 w-32 border border-gray-300 rounded-md focus:outline-cyan-600"
              value={admin1}
              onChange={(e) => setAdmin1(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-600 mr-2 whitespace-nowrap bg-gray-100 px-3 py-2 rounded-md">No Admin 2</label>
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

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search template"
          className="border rounded-lg p-2 pl-10 w-64"
        />
        <span className="absolute left-3 top-2 text-gray-400">🔍</span>
      </div>

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
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-2 py-1 bg-blue-500 text-white rounded">1</button>
      </div>

      {/* Modal for New Template */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Template</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">* Template Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTemplate.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Category</label>
                <select
                  name="category"
                  value={newTemplate.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Select Category</option>
                  <option value="Notifikasi">Notifikasi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Text to admin</label>
                <textarea
                  name="textToAdmin"
                  value={newTemplate.textToAdmin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">* Text to customer</label>
                <textarea
                  name="textToCustomer"
                  value={newTemplate.textToCustomer}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
                onClick={handleAddTemplate}
              >
                Save Template
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappConnect;