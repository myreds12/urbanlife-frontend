import React, { useState } from 'react';
import CreateTemplateModal from '../../../components/AdminDashboard/WhatsApp/CreateTemplateModal';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination'; 
import Search from '../../../components/AdminDashboard/Utils/Ui/button/Search';

const Template = () => {
  // sung kita spam dummy
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Welcome Template',
      category: 'Greeting',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Welcome to our service!',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Order Confirmation',
      category: 'Transaction',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Your order has been confirmed',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Payment Reminder',
      category: 'Finance',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Please complete your payment',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Thank You',
      category: 'Greeting',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Thank you for your purchase',
      status: 'Active'
    },
    {
      id: '5',
      name: 'Support Info',
      category: 'Support',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Contact our support team',
      status: 'Active'
    },
    {
      id: '6',
      name: 'Promo Alert',
      category: 'Marketing',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Special promotion just for you!',
      status: 'Active'
    },
    {
      id: '7',
      name: 'Delivery Update',
      category: 'Logistics',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Your package is on the way',
      status: 'Active'
    },
    {
      id: '8',
      name: 'Survey Request',
      category: 'Feedback',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Please rate our service',
      status: 'Active'
    },
    {
      id: '9',
      name: 'Holiday Greetings',
      category: 'Greeting',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Happy holidays from our team!',
      status: 'Active'
    },
    {
      id: '10',
      name: 'Account Update',
      category: 'Account',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Your account has been updated',
      status: 'Active'
    },
    {
      id: '11',
      name: 'Newsletter',
      category: 'Marketing',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Our latest news and updates',
      status: 'Active'
    },
    {
      id: '12',
      name: 'Appointment Reminder',
      category: 'Reminder',
      noAdmin1: '081122334455',
      noAdmin2: '081133224466',
      content: 'Your appointment is tomorrow',
      status: 'Active'
    }
  ]);
  const [admin1, setAdmin1] = useState('081122334455');
  const [admin2, setAdmin2] = useState('081133224466');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

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

  // Filter templates berdasarkan search term
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  const tableData = currentTemplates.map((t) => ({
    id: t.id,
    Name: t.name,
    Category: t.category,
    'No Admin 1': t.noAdmin1,
    'No Admin 2': t.noAdmin2,
    Content: t.content,
    Status: t.status, 
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    
    
    const newTotalPages = Math.ceil((templates.length + 1) / itemsPerPage);
    setCurrentPage(newTotalPages);
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
      textToAdmin: '', 
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
      
      const newFilteredTemplates = templates.filter((template) => template.id !== id)
        .filter(template =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const newTotalPages = Math.ceil(newFilteredTemplates.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  return (
      <div className="p-5">
        <div style={{ 
          background: "#ffffff", 
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}>
      {/* Compact Header Layout */}
      <div className="mb-6 pt-5 pl-5 pr-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* No Admin 1 */}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
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
          
          {/* No Admin 2 */}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
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

        {/* Search and Add Button */}
        <div className="flex items-center gap-3">
          <Search
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Search template"
            width="w-[250px]"
          />
          <Button
            variant="primary" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => {
              setEditMode(false);
              setEditId(null);
              setNewTemplate({ name: '', category: '', textToAdmin: '', textToCustomer: '' });
              setIsModalOpen(true);
            }}
          >
            New Template
            <i className="fa-solid fa-plus"></i>
          </Button>
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
          {/* Data info dan Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length} templates
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>

    </div>
  );
};

export default Template;