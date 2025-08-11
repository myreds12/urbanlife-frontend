import React, { useEffect, useState } from 'react';
import CreateTemplateModal from '../../../components/AdminDashboard/WhatsApp/CreateTemplateModal';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination'; 
import Search from '../../../components/AdminDashboard/Utils/Ui/button/Search';
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from 'react-hot-toast';


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
      setTemplates(res.data.data || []);
      setTotalItems(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [currentPage]);

  // Filtering & Pagination
  const filteredTemplates = templates.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.text_to_customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const tableData = filteredTemplates
    .slice(startIndex, startIndex + itemsPerPage)
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
    const columns = [
    "Name",
    "Category",
    "No Admin 1",
    "No Admin 2",
    "Content",
    "Status",
    "Action",
  ];

  const handleDeleteTemplate = async (id, name) => {
    const confirmed = window.confirm(`Yakin ingin menghapus "${name}"?`);
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/whatsapp/${id}`);

    try {
      await toast.promise(deletePromise, {
        loading: "Menghapus template...",
        success: `Template "${name}" berhasil dihapus.`,
        error: "Terjadi kesalahan saat menghapus.",
      });
      fetchTemplates();
    } catch (err) {
      console.error("Delete gagal:", err);
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
        <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Compact Header Layout */}
      <div className="mb-6 pt-5 pl-5 pr-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md darklabel" style={{ minWidth: "90px" }}>
              No Admin 1
            </label>
            <input
              type="text"
              placeholder="No Admin 1"
              // className="py-1 px-3 w-32 border border-gray-300 rounded-md focus:outline-cyan-600 darklabel"
              value={admin1}
              onChange={(e) => setAdmin1(e.target.value)}
              className="py-1 px-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md darklabel" style={{ minWidth: "90px" }}>
              No Admin 2
            </label>
            <input
              type="text"
              placeholder="No Admin 2"
              // className="py-1 px-3 w-32 border border-gray-300 rounded-md focus:outline-cyan-600 darklabel"
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
        <div className="text-sm text-gray-700 darksubtitle">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length} templates
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={setCurrentPage}
          size="base"
        />
      </div>

      {/* Notification Wording Guide */}
      <div className="mt-6 bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 darklabel mb-2">
              <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
              Panduan Membuat Wording Notifikasi
            </h3>
            <p className="text-sm text-gray-600 darksubtitle">
              Gunakan data customer dan paket yang tersedia untuk membuat notifikasi yang personal dan informatif
            </p>
          </div>

          {/* Petunjuk Penggunaan Data */}
          <div className="bg-blue-50 darkcard rounded-lg p-4">
            <h4 className="font-medium text-blue-800 darklabel mb-3">
              <i className="fa-solid fa-info-circle mr-2"></i>
              Petunjuk Membuat Wording Notifikasi
            </h4>
            <div className="space-y-3 text-sm text-gray-700 darksubtitle">
              <p>Saat membuat template notifikasi, pastikan untuk menyertakan informasi penting seperti:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user text-blue-500"></i>
                    <span><strong>Nama Customer</strong> - untuk personalisasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box text-blue-500"></i>
                    <span><strong>Paket Akomodasi</strong> - jenis paket yang dipilih</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-hotel text-blue-500"></i>
                    <span><strong>Nama Hotel</strong> - tempat menginap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-bed text-blue-500"></i>
                    <span><strong>Tipe Kamar</strong> - jenis kamar yang dipesan</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-money-bill text-blue-500"></i>
                    <span><strong>Total Harga</strong> - biaya keseluruhan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar text-blue-500"></i>
                    <span><strong>Tanggal Check-in</strong> - kapan mulai menginap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar-xmark text-blue-500"></i>
                    <span><strong>Tanggal Check-out</strong> - kapan selesai menginap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-blue-500"></i>
                    <span><strong>Durasi Menginap</strong> - berapa hari menginap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contoh Format Notifikasi */}
          <div className="mt-6 bg-gray-50 darkcard rounded-lg p-4">
            <h4 className="font-medium text-gray-800 darklabel mb-3">
              <i className="fa-solid fa-quote-left mr-2"></i>
              Contoh Format Notifikasi
            </h4>
            <div className="space-y-3 text-sm text-gray-700 darksubtitle">
              <p><strong>Format Umum:</strong> "Halo [Nama Customer], pesanan Anda untuk [Paket Akomodasi] di [Nama Hotel], kamar [Tipe Kamar], dengan harga [Total Harga], telah dikonfirmasi untuk [Tanggal Check-in] hingga [Tanggal Check-out] (durasi [Durasi Menginap] hari)."</p>
              <p><strong>Contoh:</strong> "Halo Budi, pesanan Anda untuk akomodasi di Hotel Santika, kamar Deluxe, dengan harga Rp1.500.000, telah dikonfirmasi untuk 12 Agustus 2025 hingga 14 Agustus 2025 (durasi 2 hari)."</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Template;