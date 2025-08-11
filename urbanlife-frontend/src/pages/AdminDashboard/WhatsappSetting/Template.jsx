import React, { useEffect, useState } from 'react';
import CreateTemplateModal from '../../../components/AdminDashboard/WhatsApp/CreateTemplateModal';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination'; 
import Search from '../../../components/AdminDashboard/Utils/Ui/button/Search';
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";


const Template = () => {
  const [templates, setTemplates] = useState([]);
  const [admin1, setAdmin1] = useState("081122334455");
  const [admin2, setAdmin2] = useState("081133224466");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    textToAdmin: "",
    textToCustomer: "",
  });

  // GET data from API
  const fetchTemplates = async () => {
    try {
      const res = await apiClient.get(`/whatsapp`, {
        params: {
          take: itemsPerPage,
          page: currentPage,
        },
      });
      setTemplates(res.data.data);
      setTotalItems(res.data.total);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [currentPage]);

  const columns = [
    "Name",
    "Category",
    "No Admin 1",
    "No Admin 2",
    "Content",
    "Status",
    "Action",
  ];

  const tableData = templates
    .filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.text_to_customer
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .map((t) => ({
      id: t.id,
      Name: t.name,
      Category: t.category,
      "No Admin 1": admin1,
      "No Admin 2": admin2,
      Content: t.text_to_customer,
      Status: t.is_active ? "Active" : "Inactive",
    }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTemplate = async () => {
    try {
      await apiClient.post("/whatsapp", {
        category: newTemplate.category,
        name: newTemplate.name,
        text_to_admin: newTemplate.textToAdmin,
        text_to_customer: newTemplate.textToCustomer,
      });
      resetModal();
      fetchTemplates();
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  const handleEditTemplate = async () => {
    try {
      await apiClient.patch(`/whatsapp/${editId}`, {
        category: newTemplate.category,
        name: newTemplate.name,
        text_to_admin: newTemplate.textToAdmin,
        text_to_customer: newTemplate.textToCustomer,
      });
      resetModal();
      fetchTemplates();
    } catch (error) {
      console.error("Error editing template:", error);
    }
  };

  const handleEdit = (row) => {
    const template = templates.find((t) => t.id === row.id);
    if (!template) return;
    setNewTemplate({
      name: template.name,
      category: template.category,
      textToAdmin: template.text_to_admin,
      textToCustomer: template.text_to_customer,
    });
    setEditId(template.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteTemplate = async (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;
    try {
      await apiClient.delete(`/whatsapp/${id}`);
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const resetModal = () => {
    setNewTemplate({ name: "", category: "", textToAdmin: "", textToCustomer: "" });
    setIsModalOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        {/* Admin Numbers */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
              No Admin 1
            </label>
            <input
              type="text"
              value={admin1}
              onChange={(e) => setAdmin1(e.target.value)}
              className="py-1 px-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
              No Admin 2
            </label>
            <input
              type="text"
              value={admin2}
              onChange={(e) => setAdmin2(e.target.value)}
              className="py-1 px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        {/* Search & Add */}
        <div className="flex items-center gap-3">
          <Search
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            placeholder="Search template"
            width="w-[250px]"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditMode(false);
              setEditId(null);
              setNewTemplate({ name: "", category: "", textToAdmin: "", textToCustomer: "" });
              setIsModalOpen(true);
            }}
          >
            New Template
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

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} templates
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={setCurrentPage}
          size="base"
        />
      </div>
    </div>
  );
};

export default Template;