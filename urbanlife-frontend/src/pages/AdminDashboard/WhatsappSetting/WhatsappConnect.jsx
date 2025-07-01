import React, { useState } from 'react';
import CreateTemplateModal from '../../../components/AdminDashboard/WhatsApp/CreateTemplateModal';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import '../../../styles/AdminDashboard/WhatsappSetting/WhatsappConnect.css';

const WhatsappConnect = () => {
  const [templates, setTemplates] = useState([]);
  const [admin1, setAdmin1] = useState('081122334455');
  const [admin2, setAdmin2] = useState('081133224466');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: '',
    textToAdmin: '',
    textToCustomer: '',
  });

  const columns = [
    'Name',
    'Category',
    'No Admin 1',
    'No Admin 2',
    'Content',
    'Status',
    'Action'
  ];

  const tableData = templates.map((t) => ({
    id: t.id,
    Name: t.name,
    Category: t.category,
    'No Admin 1': t.noAdmin1,
    'No Admin 2': t.noAdmin2,
    Content: t.content,
    Status: (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
        {t.status}
      </span>
    ),
  }));

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
    resetModal();
  };

  const handleEditTemplate = () => {
    setTemplates(prev =>
      prev.map(t =>
        t.id === editId
          ? {
              ...t,
              name: newTemplate.name,
              category: newTemplate.category,
              content: newTemplate.textToCustomer,
            }
          : t
      )
    );
    resetModal();
  };

  const resetModal = () => {
    setNewTemplate({ name: '', category: '', textToAdmin: '', textToCustomer: '' });
    setIsModalOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (row) => {
    const template = templates.find((t) => t.id === row.id);
    if (!template) return;

    setNewTemplate({
      name: template.name,
      category: template.category,
      textToAdmin: '', // Bisa diisi kalau kamu simpan ini
      textToCustomer: template.content,
    });

    setAdmin1(template.noAdmin1);
    setAdmin2(template.noAdmin2);
    setEditId(template.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteTemplate = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this template?");
    if (confirmed) {
      setTemplates(templates.filter((template) => template.id !== id));
    }
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
        <Button
          variant="primary"
          onClick={() => {
            setEditMode(false);
            setEditId(null);
            setNewTemplate({ name: '', category: '', textToAdmin: '', textToCustomer: '' });
            setIsModalOpen(true);
          }}
        >
          + New Template
        </Button>
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
        <Table
          data={tableData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(row) => handleDeleteTemplate(row.id)}
        />
      </div>

      {/* Pagination dummy */}
      <div className="mt-4 flex justify-end">
        <button className="px-2 py-1 bg-blue-500 text-white rounded">1</button>
      </div>

      {/* Modal */}
      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={resetModal}
        newTemplate={newTemplate}
        onInputChange={handleInputChange}
        onSave={editMode ? handleEditTemplate : handleAddTemplate}
        admin1={admin1}
        admin2={admin2}
      />
    </div>
  );
};

export default WhatsappConnect;
