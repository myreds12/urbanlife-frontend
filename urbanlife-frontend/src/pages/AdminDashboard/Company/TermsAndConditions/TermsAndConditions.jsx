import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const dummyData = {
  hero: {
    id: 'hero',
    title_en: 'Terms & Conditions',
    title_id: 'Syarat & Ketentuan',
    subtitle_en: 'Clear guidelines for using our platform and services. Last updated January 2025.',
    subtitle_id: 'Panduan jelas untuk menggunakan platform dan layanan kami. Terakhir diperbarui Januari 2025.',
    image_url: 'https://placehold.co/1200x400/cyan/white',
  },
  custom: [
    {
      id: 'intro',
      section: 'Introduction',
      title_en: 'Introduction',
      title_id: 'Pengenalan',
      content_en: 'Welcome to the Urbanlife platform. If you continue to browse and use this website, you agree to comply with and be bound by the following terms and conditions of use.',
      content_id: 'Selamat datang di platform Urbanlife. Jika Anda terus menelusuri dan menggunakan situs web ini, Anda setuju untuk mematuhi syarat dan ketentuan penggunaan berikut.',
      notes_en: 'The term "Urbanlife" refers to PT. Urban Digital Media.',
      notes_id: 'Istilah "Urbanlife" merujuk pada PT. Urban Digital Media.',
      warning_en: '',
      warning_id: '',
    },
    {
      id: 'usage',
      section: 'Terms of Use',
      title_en: 'Terms of Use',
      title_id: 'Syarat Penggunaan',
      content_en: 'The use of this website is subject to the following terms: (1) Content is for general information. (2) Cookies are used to monitor preferences.',
      content_id: 'Penggunaan situs web ini tunduk pada syarat: (1) Konten untuk informasi umum. (2) Cookie digunakan untuk memantau preferensi.',
      notes_en: '',
      notes_id: '',
      warning_en: 'Unauthorized use may lead to legal action.',
      warning_id: 'Penggunaan tanpa izin dapat menyebabkan tindakan hukum.',
    },
    {
      id: 'privacy',
      section: 'Privacy & Data',
      title_en: 'Privacy & Data',
      title_id: 'Privasi & Data',
      content_en: 'We handle your information with care. Personal data may be collected for analytics.',
      content_id: 'Kami menangani informasi Anda dengan hati-hati. Data pribadi dapat dikumpulkan untuk analitik.',
      notes_en: '',
      notes_id: '',
      warning_en: 'Illegal content is not permitted.',
      warning_id: 'Konten ilegal tidak diizinkan.',
    },
  ],
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  useEffect(() => {
    const fetchContents = () => {
      setLoading(true);
      try {
        const localData = JSON.parse(localStorage.getItem('termsAndConditionsData'));
        const heroData = JSON.parse(localStorage.getItem('heroData')) || dummyData.hero;
        const sourceData = localData && localData.length > 0 ? localData : dummyData.custom;
        const flattenedData = [
          { ...heroData, section: 'Hero' },
          ...sourceData,
        ];
        setContents(flattenedData);
        setTotal(flattenedData.length);
      } catch (err) {
        console.error('Failed to fetch terms and conditions contents', err);
        toast.error('Failed to load data. Using local/dummy data.');
        const flattenedDummy = [
          { ...dummyData.hero, section: 'Hero' },
          ...dummyData.custom,
        ];
        setContents(flattenedDummy);
        setTotal(flattenedDummy.length);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, [currentPage]);

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    if (rowId === 'hero') {
      toast.error('The hero section cannot be selected.');
      return;
    }
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleView = (row) => {
    setSelectedModalData(row);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    navigate(`/admin/terms-conditions/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    if (row.id === 'hero') {
      toast.error('The hero section cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete the section "${row.section || row.title_en}"?`)) return;

    const updatedContents = contents.filter(item => item.id !== row.id);
    const customContents = updatedContents.filter(item => item.id !== 'hero');
    localStorage.setItem('termsAndConditionsData', JSON.stringify(customContents));
    setContents(updatedContents);
    setTotal(updatedContents.length);
    toast.success(`Section "${row.section || row.title_en}" was successfully deleted.`);
  };

  const handleBulkDelete = (selectedData) => {
    if (selectedData.some((item) => item.id === 'hero')) {
      toast.error('The hero section cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete ${selectedData.length} selected sections?`)) return;

    const selectedIds = selectedData.map(item => item.id);
    const updatedContents = contents.filter(item => !selectedIds.includes(item.id));
    const customContents = updatedContents.filter(item => item.id !== 'hero');
    localStorage.setItem('termsAndConditionsData', JSON.stringify(customContents));
    setContents(updatedContents);
    setTotal(updatedContents.length);
    setSelectedRows([]);
    toast.success(`${selectedData.length} sections were successfully deleted.`);
  };

  const handleClearSelection = () => setSelectedRows([]);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return contents;
    }
    return contents.filter((content) =>
      Object.values(content).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
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
    'Section': (row) => row.section,
    'Title (EN)': (row) => row.title_en,
    'Title (ID)': (row) => row.title_id,
    Action: null,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  const selectedData = sortedData.filter((item) => selectedRows.includes(item.id));

  return (
    <div className="p-5">
      <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', maxWidth: '1050px', margin: '0 auto' }}>
        {selectedRows.length > 0 && (
          <BulkActionBar
            selectedCount={selectedRows.length}
            selectedData={selectedData}
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
                { key: 'notes_en', label: 'Notes (EN)', type: 'textarea' },
                { key: 'notes_id', label: 'Notes (ID)', type: 'textarea' },
                { key: 'warning_en', label: 'Warnings (EN)', type: 'textarea' },
                { key: 'warning_id', label: 'Warnings (ID)', type: 'textarea' },
                { key: 'subtitle_en', label: 'Subtitle (EN)', type: 'textarea' },
                { key: 'subtitle_id', label: 'Subtitle (ID)', type: 'textarea' },
                { key: 'image_url', label: 'Image', type: 'image' },
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default TermsAndConditions;