import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

// Dummy data fallback (disederhanakan sepenuhnya)
const dummyData = {
  hero: {
    id: 1,
    title_en: "Your Data, Protected",
    title_id: "Data Anda, Terlindungi",
    subtitle_en: "Transparency in how we protect and handle your personal information",
    subtitle_id: "Transparansi dalam cara kami melindungi dan menangani informasi pribadi Anda",
  },
  intro: {
    id: 2,
    title_en: "Our Commitment to You",
    title_id: "Komitmen Kami untuk Anda",
    content_en: "We respect your right to privacy. This Privacy Policy explains how <strong>UrbanLife</strong> (PT. Urban Digital Media) collects, stores, uses, processes, retains, transfers, discloses, and protects your personal information on <a href='https://urbanlife.id' className='text-cyan-600 hover:text-cyan-700 underline decoration-cyan-300' target='_blank' rel='noopener noreferrer'>urbanlife.id</a>.",
    content_id: "Kami menghormati hak Anda atas privasi. Kebijakan Privasi ini menjelaskan bagaimana <strong>UrbanLife</strong> (PT. Urban Digital Media) mengumpulkan, menyimpan, menggunakan, memproses, menyimpan, mentransfer, mengungkapkan, dan melindungi informasi pribadi Anda di <a href='https://urbanlife.id' className='text-cyan-600 hover:text-cyan-700 underline decoration-cyan-300' target='_blank' rel='noopener noreferrer'>urbanlife.id</a>.",
  },
  custom: [
    {
      id: "personal-info",
      section_number: 1,
      title_en: "Personal Information Collection",
      title_id: "Pengumpulan Informasi Pribadi",
      content_en: "We collect information that identifies or can be used to identify, contact, or locate you or your device (personal information), including name, address, date of birth, occupation, phone number, email address, bank account details, gender, photo, nationality, and identification documents (e.g., KTP, SIM, or Passport).",
      content_id: "Kami mengumpulkan informasi yang dapat mengidentifikasi atau digunakan untuk mengidentifikasi, menghubungi, atau menemukan Anda atau perangkat Anda (informasi pribadi), termasuk nama, alamat, tanggal lahir, pekerjaan, nomor telepon, alamat email, detail rekening bank, gender, foto, kewarganegaraan, dan dokumen identitas (misalnya, KTP, SIM, atau Paspor).",
      notes_en: "",
      notes_id: "",
      warning_en: "",
      warning_id: "",
    },
    {
      id: "use-info",
      section_number: 2,
      title_en: "Information Usage",
      title_id: "Penggunaan Informasi",
      content_en: "",
      content_id: "",
      notes_en: "",
      notes_id: "",
      warning_en: "",
      warning_id: "",
    },
  ],
  contact: {
    id: 3,
    title_en: "Get in Touch",
    title_id: "Hubungi Kami",
    email: "info@urbanlife.id",
    phone: "+62 816 919 812",
  },
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const fetchContents = async (search = "") => {
    setLoading(true);
    try {
      const params = { page: currentPage, take, ...(search.trim() && { search: search.trim() }) };
      const res = await apiClient.get("/privacypolicy", { params });
      const { data, total } = res.data;
      setContents(data); // Langsung pake data, udah nggak perlu filter
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch privacy policy contents", err);
      toast.error("Gagal memuat data Privacy Policy dari API. Menggunakan dummy data.");
      const simplifiedDummy = [
        { ...dummyData.hero },
        ...dummyData.custom,
        { ...dummyData.contact },
      ].map((item, index) => ({ id: item.id || index + 1, ...item }));
      setContents(simplifiedDummy);
      setTotal(simplifiedDummy.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents(searchTerm);
  }, [currentPage, searchTerm]);

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleView = async (row) => {
    try {
      const { data } = await apiClient.get(`/privacypolicy/${row.id}`);
      setSelectedModalData(data.data); // Langsung pake data, udah nggak perlu filter
    } catch (error) {
      console.error("Failed to fetch details:", error);
      toast.error("Gagal memuat detail Privacy Policy dari API. Menggunakan dummy data.");
      const dummyMatch = [
        dummyData.hero,
        ...dummyData.custom,
        dummyData.contact,
      ].find((item) => item.id === row.id);
      setSelectedModalData(dummyMatch || row);
    }
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    navigate(`/admin/privacy-policy/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Hapus section "${row.title_en || row.title_id}"?`)) return;
    try {
      await apiClient.delete(`/privacypolicy/${row.id}`);
      toast.success(`Section "${row.title_en || row.title_id}" berhasil dihapus`);
      fetchContents();
    } catch (err) {
      console.error("Gagal menghapus:", err);
      toast.error("Gagal menghapus section. Coba lagi.");
    }
  };

  const handleBulkDelete = async (selectedData) => {
    if (!window.confirm(`Hapus ${selectedData.length} section?`)) return;
    const ids = selectedData.map((item) => item.id);
    try {
      await apiClient.delete("/privacypolicy", { data: { ids } });
      toast.success(`${selectedData.length} section berhasil dihapus`);
      setSelectedRows([]);
      fetchContents();
    } catch (err) {
      console.error("Bulk delete failed:", err);
      toast.error("Gagal menghapus section. Coba lagi.");
    }
  };

  const handleClearSelection = () => setSelectedRows([]);

  const filteredData = useMemo(() => {
    return contents.filter((content) =>
      Object.values(content).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contents, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(total / take);
  const startIndex = (currentPage - 1) * take;
  const currentData = sortedData.slice(startIndex, startIndex + take);

  const handlePageChange = (page) => setCurrentPage(page);

  const columns = ["#", "Section Number", "Title (EN)", "Title (ID)", "Action"];
  const mapping = {
    "#": (_, index) => startIndex + index + 1,
    "Section Number": (row) => row.section_number || (row.id === 1 ? "Hero" : row.id === 2 ? "Intro" : row.id === contents.length ? "Contact" : row.section_number),
    "Title (EN)": (row) => row.title_en || (row.id === 1 ? "Hero" : row.id === 2 ? "Introduction" : row.id === contents.length ? "Contact" : ""),
    "Title (ID)": (row) => row.title_id || (row.id === 1 ? "Hero" : row.id === 2 ? "Pengenalan" : row.id === contents.length ? "Kontak" : ""),
    Action: null,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div style={{ background: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", overflow: "hidden", maxWidth: "1050px", margin: "0 auto" }}>
        {selectedRows.length > 0 && (
          <BulkActionBar
            selectedCount={selectedRows.length}
            selectedData={sortedData.filter((item) => selectedRows.includes(item.id))}
            onClearSelection={handleClearSelection}
            onBulkDelete={handleBulkDelete}
          />
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Privacy Policy Management</h1>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search sections..."
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/admin/privacy-policy/create")}
            >
              Add Section <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table
            data={currentData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            sortConfig={sortConfig}
            startIndex={startIndex}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultMapping={mapping}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of {total} sections
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>

      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Privacy Policy Detail"
        data={selectedModalData}
        config={{
          sections: [
            {
              fields: [
                { key: "section_number", label: "Section Number" },
                { key: "title_en", label: "Title (EN)" },
                { key: "title_id", label: "Title (ID)" },
                { key: "content_en", label: "Content (EN)", type: "textarea" },
                { key: "content_id", label: "Content (ID)", type: "textarea" },
                { key: "notes_en", label: "Notes (EN)", type: "textarea" },
                { key: "notes_id", label: "Notes (ID)", type: "textarea" },
                { key: "warning_en", label: "Warning (EN)", type: "textarea" },
                { key: "warning_id", label: "Warning (ID)", type: "textarea" },
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default PrivacyPolicy;