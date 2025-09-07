import React, { useState, useEffect, useMemo } from 'react';
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from 'react-hot-toast';

// Dummy data fallback
const dummyData = {
  hero: {
    id: 'hero',
    title_en: 'Terms & Conditions',
    title_id: 'Syarat & Ketentuan',
    subtitle_en: 'Clear guidelines for using our platform and services. Last updated January 2025.',
    subtitle_id: 'Panduan jelas untuk menggunakan platform dan layanan kami. Terakhir diperbarui Januari 2025.',
    image_url: 'https://example.com/hero-image.jpg',
  },
  custom: [
    {
      id: 'intro',
      section: 'Introduction',
      title_en: 'Introduction',
      title_id: 'Pengenalan',
      content_en: 'Welcome to Urbanlife platform. If you continue to browse and use this website, you agree to comply with and are bound to the following terms and conditions of use.',
      content_id: 'Selamat datang di platform Urbanlife. Jika Anda terus menelusuri dan menggunakan situs web ini, Anda setuju untuk mematuhi syarat dan ketentuan penggunaan berikut.',
      notes: [{ en: 'The term "Urbanlife" refers to PT. Urban Digital Media.', id: 'Istilah "Urbanlife" merujuk pada PT. Urban Digital Media.' }],
      warning: [],
    },
    {
      id: 'usage',
      section: 'Terms of Use',
      title_en: 'Terms of Use',
      title_id: 'Syarat Penggunaan',
      content_en: 'The use of this website is subject to the following terms: (1) Content is for general information. (2) Cookies are used to monitor preferences.',
      content_id: 'Penggunaan situs web ini tunduk pada syarat: (1) Konten untuk informasi umum. (2) Cookie digunakan untuk memantau preferensi.',
      notes: [],
      warning: [{ en: 'Unauthorized use may lead to legal action.', id: 'Penggunaan tanpa izin dapat menyebabkan tindakan hukum.' }],
    },
    {
      id: 'privacy',
      section: 'Privacy Policy',
      title_en: 'Privacy & Data',
      title_id: 'Privasi & Data',
      content_en: 'We handle your information with care. Personal data may be collected for analytics.',
      content_id: 'Kami menangani informasi Anda dengan hati-hati. Data pribadi dapat dikumpulkan untuk analitik.',
      notes: [],
      warning: [{ en: 'Illegal content is not permitted.', id: 'Konten ilegal tidak diizinkan.' }],
    },
    {
      id: 'content',
      section: 'Content Guidelines',
      title_en: 'Content Guidelines',
      title_id: 'Panduan Konten',
      content_en: 'Guidelines for content creation on our platform.',
      content_id: 'Panduan untuk pembuatan konten di platform kami.',
      notes: [{ en: 'Follow community standards.', id: 'Ikuti standar komunitas.' }],
      warning: [],
    },
    {
      id: 'liability',
      section: 'Liability',
      title_en: 'Liability & Disclaimer',
      title_id: 'Tanggung Jawab & Penyangkalan',
      content_en: 'Use of this website is at your own risk. We are not liable for inaccuracies.',
      content_id: 'Penggunaan situs web ini sepenuhnya risiko Anda. Kami tidak bertanggung jawab atas ketidakakuratan.',
      notes: [],
      warning: [{ en: 'Reproduction of content is prohibited.', id: 'Reproduksi konten dilarang.' }],
    },
  ],
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const fetchContents = async (search = '') => {
    setLoading(true);
    try {
      const params = { page: currentPage, take, ...(search.trim() && { search: search.trim() }) };
      const res = await apiClient.get('/termsandconditions', { params });
      const { data, total } = res.data;
      const flattenedData = [
        { id: 'hero', section: 'Hero', ...data.hero },
        ...data.custom.map((item) => ({ id: item.id || `custom${item.section}`, ...item })),
      ];
      setContents(flattenedData);
      setTotal(flattenedData.length);
    } catch (err) {
      console.error('Failed to fetch terms and conditions contents', err);
      toast.error('Failed to load Terms & Conditions data from API. Using dummy data.');
      const flattenedDummy = [
        { id: 'hero', section: 'Hero', ...dummyData.hero },
        ...dummyData.custom,
      ].map((item, index) => ({ id: item.id || `item${index + 1}`, ...item }));
      setContents(flattenedDummy);
      setTotal(flattenedDummy.length);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  let mounted = true;
  const fetchContents = async (search = '') => {
    if (!mounted) return;
    setLoading(true);
    try {
      const params = { page: currentPage, take, ...(search.trim() && { search: search.trim() }) };
      const res = await apiClient.get('/termsandconditions', { params });
      const { data, total } = res.data;
      const flattenedData = [
        { id: 'hero', section: 'Hero', ...data.hero },
        ...data.custom.map((item) => ({ id: item.id || `custom${item.section}`, ...item })),
      ];
      setContents(flattenedData);
      setTotal(total || flattenedData.length); // Sinkron total dengan API atau dummy
    } catch (err) {
      console.error('Failed to fetch', err);
      toast.error('Failed to load data. Using dummy.');
      const flattenedDummy = [
        { id: 'hero', section: 'Hero', ...dummyData.hero },
        ...dummyData.custom,
      ].map((item, index) => ({ id: item.id || `item${index + 1}`, ...item }));
      setContents(flattenedDummy);
      setTotal(flattenedDummy.length);
    } finally {
      setLoading(false);
    }
  };
  fetchContents(searchTerm);
  return () => { mounted = false; };
}, [currentPage, searchTerm]);

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    if (rowId === 'hero') {
      toast.error('Hero section cannot be selected for deletion.');
      return;
    }
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleView = async (row) => {
    try {
      const { data } = await apiClient.get(`/termsandconditions/${row.id}`);
      setSelectedModalData(data.data);
    } catch (error) {
      console.error('Failed to fetch details:', error);
      toast.error('Failed to load Terms & Conditions details from API. Using dummy data.');
      const dummyMatch = [
        dummyData.hero,
        ...dummyData.custom,
      ].find((item) => item.id === row.id);
      setSelectedModalData(dummyMatch || row);
    }
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    navigate(`/admin/terms-conditions/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    if (row.id === 'hero') {
      toast.error('Hero section cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete section "${row.section || row.title_en || row.title_id}"?`)) return;
    try {
      await apiClient.delete(`/termsandconditions/${row.id}`);
      toast.success(`Section "${row.section || row.title_en || row.title_id}" deleted successfully`);
      fetchContents();
    } catch (err) {
      console.error('Failed to delete:', err);
      toast.error('Failed to delete section. Please try again.');
    }
  };

  const handleBulkDelete = async (selectedData) => {
    if (selectedData.some((item) => item.id === 'hero')) {
      toast.error('Hero section cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete ${selectedData.length} section(s)?`)) return;
    const ids = selectedData.map((item) => item.id);
    try {
      await apiClient.delete('/termsandconditions', { data: { ids } });
      toast.success(`${selectedData.length} section(s) deleted successfully`);
      setSelectedRows([]);
      fetchContents();
    } catch (err) {
      console.error('Bulk delete failed:', err);
      toast.error('Failed to delete sections. Please try again.');
    }
  };

  const handleClearSelection = () => setSelectedRows([]);

  const filteredData = useMemo(() => {
    return contents.filter((content) =>
      Object.values(content).some((value) => {
        if (Array.isArray(value)) {
          return value.some((item) =>
            Object.values(item).some((subValue) =>
              String(subValue).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [contents, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key] || '';
      let bValue = b[sortConfig.key] || '';
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(total / take);
  const startIndex = (currentPage - 1) * take;
  const currentData = sortedData.slice(startIndex, startIndex + take);

  const handlePageChange = (page) => setCurrentPage(page);

  const columns = ['#', 'Section', 'Title (EN)', 'Title (ID)', 'Action'];
  const mapping = {
    '#': (_, index) => startIndex + index + 1,
    'Section': (row) => row.section || 'Hero',
    'Title (EN)': (row) => row.title_en || 'Hero',
    'Title (ID)': (row) => row.title_id || 'Hero',
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
      <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', maxWidth: '1050px', margin: '0 auto' }}>
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
            <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions Management</h1>
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
              onClick={() => navigate('/admin/terms-conditions/create')}
            >
              Add Section <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
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
        <div className="text-sm text-gray-600">
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
        title="Terms & Conditions Detail"
        data={selectedModalData}
        config={{
          sections: [
            {
              fields: [
                { key: 'section', label: 'Section' },
                { key: 'title_en', label: 'Title (EN)' },
                { key: 'title_id', label: 'Title (ID)' },
                { key: 'content_en', label: 'Content (EN)', type: 'textarea' },
                { key: 'content_id', label: 'Content (ID)', type: 'textarea' },
                { key: 'notes', label: 'Notes', type: 'list', fields: [{ key: 'en', label: 'Note (EN)' }, { key: 'id', label: 'Note (ID)' }] },
                { key: 'warning', label: 'Warnings', type: 'list', fields: [{ key: 'en', label: 'Warning (EN)' }, { key: 'id', label: 'Warning (ID)' }] },
                { key: 'image_url', label: 'Image', type: 'image' },
                { key: 'subtitle_en', label: 'Subtitle (EN)', type: 'textarea' },
                { key: 'subtitle_id', label: 'Subtitle (ID)', type: 'textarea' },
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default TermsAndConditions;