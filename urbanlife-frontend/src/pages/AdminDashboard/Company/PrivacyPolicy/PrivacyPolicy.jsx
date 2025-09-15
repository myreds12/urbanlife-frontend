import React, { useState, useEffect, useMemo, useCallback } from "react";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

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

  const fetchContents = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        take,
        ...(search.trim() && { search: search.trim() }),
      };

      const res = await apiClient.get("/privacyandpolicy", { params });
      const { data, total } = res.data;

      // langsung pakai data array dari API
      setContents(data || []);
      setTotal(total || 0);
    } catch (err) {
      console.error("Failed to fetch privacy policy contents", err);
      toast.error("Gagal memuat data Privacy Policy dari API. Menggunakan dummy data.");

      // fallback dummy
      setContents(dummyData);
      setTotal(dummyData.length);
    } finally {
      setLoading(false);
    }
  }, [currentPage, take]);


  useEffect(() => {
    fetchContents(searchTerm);
  }, [currentPage, searchTerm, fetchContents]);

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
      setSelectedModalData(data.data);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      toast.error("Gagal memuat detail Privacy Policy dari API. Menggunakan dummy data.");
      const dummyMatch = [
        dummyData.hero,
        ...dummyData.custom,
        ...dummyData.additional,
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
      await apiClient.delete(`/privacyandpolicy/${row.id}`);
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
      await apiClient.delete("/privacyandpolicy", { data: { ids } });
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

  const columns = ["#", "Title (EN)", "Title (ID)", "Contact Title (EN)", "Contact Title (ID)", "Action"];

  const mapping = {
    "#": (_, index) => startIndex + index + 1,
    "Title (EN)": (row) => row.title_en || "-",
    "Title (ID)": (row) => row.title_id || "-",
    "Contact Title (EN)": (row) => row.contact_title_en || "-",
    "Contact Title (ID)": (row) => row.contact_title_id || "-",
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
                { key: "section", label: "Section" },
                { key: "title_en", label: "Title (EN)" },
                { key: "title_id", label: "Title (ID)" },
                { key: "content_en", label: "Content (EN)", type: "textarea" },
                { key: "content_id", label: "Content (ID)", type: "textarea" },
                { key: "notes", label: "Notes", type: "array", subFields: [{ key: "en", label: "EN" }, { key: "id", label: "ID" }] },
                { key: "warning", label: "Warnings", type: "array", subFields: [{ key: "en", label: "EN" }, { key: "id", label: "ID" }] },
              ],
            },
          ],
        }}
      />
    </div>
  );
};


const dummyData = {
  hero: {
    id: 'hero',
    title_en: "Your Data, Protected",
    title_id: "Data Anda, Terlindungi",
    subtitle_en: "Transparency in how we protect and handle your personal information",
    subtitle_id: "Transparansi dalam cara kami melindungi dan menangani informasi pribadi Anda",
  },
  custom: [
    {
      id: 'personal-info',
      section_number: 1,
      section: 'Personal Information Collection',
      title_en: "Personal Information Collection",
      title_id: "Pengumpulan Informasi Pribadi",
      content_en: "We collect information that identifies or can be used to identify, contact, or locate you or your device (personal information), including name, address, date of birth, occupation, phone number, email address, bank account details, gender, photo, nationality, and identification documents (e.g., KTP, SIM, or Passport).",
      content_id: "Kami mengumpulkan informasi yang dapat mengidentifikasi atau digunakan untuk mengidentifikasi, menghubungi, atau menemukan Anda atau perangkat Anda (informasi pribadi), termasuk nama, alamat, tanggal lahir, pekerjaan, nomor telepon, alamat email, detail rekening bank, gender, foto, kewarganegaraan, dan dokumen identitas (misalnya, KTP, SIM, atau Paspor).",
      notes: [{ en: "Please ensure all details are accurate.", id: "Pastikan semua detail akurat." }],
      warning: [{ en: "Misuse of data may result in legal action.", id: "Penyalahgunaan data dapat menyebabkan tindakan hukum." }],
    },
    {
      id: 'use-info',
      section_number: 2,
      section: 'Information Usage',
      title_en: "Information Usage",
      title_id: "Penggunaan Informasi",
      content_en: "Your information is used to provide and improve our services, process transactions, and communicate with you effectively.",
      content_id: "Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan kami, memproses transaksi, dan berkomunikasi dengan Anda secara efektif.",
      notes: [{ en: "Data usage is logged for security.", id: "Penggunaan data dicatat untuk keamanan." }],
      warning: [{ en: "Unauthorized access is prohibited.", id: "Akses tanpa izin dilarang." }],
    },
    {
      id: 'share-info',
      section_number: 3,
      section: 'Information Sharing',
      title_en: "Information Sharing",
      title_id: "Pembagian Informasi",
      content_en: "We may share your information with affiliates or third parties only for legal or service-related purposes, never for sale.",
      content_id: "Kami dapat membagikan informasi Anda dengan afiliasi atau pihak ketiga hanya untuk tujuan hukum atau terkait layanan, tidak pernah untuk dijual.",
      notes: [{ en: "Sharing is limited to trusted partners.", id: "Pembagian dibatasi pada mitra terpercaya." }],
      warning: [{ en: "Data sales are strictly forbidden.", id: "Penjualan data sangat dilarang." }],
    },
    {
      id: 'storage-info',
      section_number: 4,
      section: 'Data Storage',
      title_en: "Data Storage",
      title_id: "Penyimpanan Data",
      content_en: "Your data is stored only as long as needed for our services or as required by law.",
      content_id: "Data Anda disimpan hanya selama diperlukan untuk layanan kami atau sebagaimana diwajibkan oleh hukum.",
      notes: [{ en: "Data retention follows legal standards.", id: "Retensi data mengikuti standar hukum." }],
      warning: [{ en: "Unauthorized retention is illegal.", id: "Retensi tanpa izin melanggar hukum." }],
    },
    {
      id: 'protection-info',
      section_number: 5,
      section: 'Data Protection',
      title_en: "Data Protection",
      title_id: "Perlindungan Data",
      content_en: "We use security measures to protect your data, though absolute security over the internet cannot be guaranteed.",
      content_id: "Kami menggunakan langkah keamanan untuk melindungi data Anda, meskipun keamanan absolut di internet tidak dapat dijamin.",
      notes: [{ en: "Regular security audits are conducted.", id: "Audit keamanan dilakukan secara rutin." }],
      warning: [{ en: "Report security breaches immediately.", id: "Laporkan pelanggaran keamanan segera." }],
    },
    {
      id: 'amendment-access',
      section_number: 6,
      section: 'Access & Amendment',
      title_en: "Access & Amendment",
      title_id: "Akses & Perubahan",
      content_en: "You can request access to or correction of your data, subject to certain limitations.",
      content_id: "Anda dapat meminta akses atau perbaikan data Anda, dengan beberapa batasan tertentu.",
      notes: [{ en: "Requests must be submitted in writing.", id: "Permintaan harus dikirim secara tertulis." }],
      warning: [{ en: "False requests may be rejected.", id: "Permintaan palsu dapat ditolak." }],
    },
  ],
  contact: {
    id: 'contact',
    title_en: "Get in Touch",
    title_id: "Hubungi Kami",
    email: "info@urbanlife.id",
    phone: "+62 816 919 812",
  },
  additional: [
    {
      id: 'amendment-policy',
      section: 'Policy Updates',
      title_en: 'Policy Updates',
      content_en: 'We may review and amend this privacy policy from time to time. Changes will be notified through our website, and continued use indicates acceptance of updates.',
      content_id: 'Kami dapat meninjau dan mengubah kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui situs web kami, dan penggunaan yang terus-menerus menunjukkan penerimaan terhadap pembaruan.',
    },
    {
      id: 'acknowledgment',
      section: 'Your Agreement',
      title_en: 'Your Agreement',
      content_en: 'By using our services, you acknowledge reading and agreeing to this policy. You consent to our data processing practices as described herein.',
      content_id: 'Dengan menggunakan layanan kami, Anda mengakui telah membaca dan menyetujui kebijakan ini. Anda menyetujui praktik pemrosesan data kami sebagaimana dijelaskan di sini.',
    },
  ],
};

export default PrivacyPolicy;