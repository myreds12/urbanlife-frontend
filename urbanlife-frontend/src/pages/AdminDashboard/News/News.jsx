import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
// import Export from '../../../components/AdminDashboard/Utils/Ui/button/Export';
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import ModalEdit from '../../../components/AdminDashboard/Utils/Ui/modal/ModalEdit';

const News = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const [NewsData, setNewsData] = useState([
    { id: 'N001', newscategory: 'Culture', newssubject: 'Barong Dance', datecreated: '09/07/2025'},
    { id: 'N002', newscategory: 'Culture', newssubject: 'Traditional Music Festival', datecreated: '10/07/2025'},
    { id: 'N003', newscategory: 'Tourism', newssubject: 'New Tourist Destination', datecreated: '11/07/2025'},
    { id: 'N004', newscategory: 'Culture', newssubject: 'Art Exhibition', datecreated: '12/07/2025'},
    { id: 'N005', newscategory: 'Tourism', newssubject: 'Beach Resort Opening', datecreated: '13/07/2025'},
    { id: 'N006', newscategory: 'Culture', newssubject: 'Cultural Workshop', datecreated: '14/07/2025'},
    { id: 'N007', newscategory: 'Tourism', newssubject: 'Mountain Hiking Trail', datecreated: '15/07/2025'},
    { id: 'N008', newscategory: 'Culture', newssubject: 'Dance Performance', datecreated: '16/07/2025'},
    { id: 'N009', newscategory: 'Tourism', newssubject: 'Local Food Festival', datecreated: '17/07/2025'},
    { id: 'N010', newscategory: 'Culture', newssubject: 'Historical Site Visit', datecreated: '18/07/2025'},
    { id: 'N011', newscategory: 'Tourism', newssubject: 'Island Hopping Tour', datecreated: '19/07/2025'},
    { id: 'N012', newscategory: 'Culture', newssubject: 'Traditional Craft Fair', datecreated: '20/07/2025'},
    { id: 'N013', newscategory: 'Tourism', newssubject: 'Adventure Sports Event', datecreated: '21/07/2025'},
    { id: 'N014', newscategory: 'Culture', newssubject: 'Music and Dance Show', datecreated: '22/07/2025'},
  ]);

  const columns = ['News Category', 'News Subject', 'Date Created', 'Action'];

  // Define form fields for the modal
  const modalFields = [
    {
      name: 'newscategory',
      label: 'News Category',
      type: 'select',
      required: true,
      options: [
        { value: 'Culture', label: 'Culture' },
      ]
    },
    {
      name: 'newssubject',
      label: 'News Subject',
      type: 'text',
      required: true,
      placeholder: 'Enter news subject...',
      validate: (value) => {
        if (value.length < 3) return 'News subject must be at least 3 characters';
        if (value.length > 100) return 'News subject must be less than 100 characters';
        return null;
      }
    },
    {
      name: 'datecreated',
      label: 'Date Created',
      type: 'date',
      required: true
    }
  ];

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleEdit = (row) => {
    setEditingNews(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setIsLoading(false);
  };

  const handleModalSave = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the news data
      setNewsData(prev => prev.map(news => 
        news.id === editingNews.id 
          ? { ...news, ...formData }
          : news
      ));
      
      // Show success message
      alert(`News "${formData.newssubject}" has been updated successfully!`);
      
      // Close modal
      handleModalClose();
      
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Failed to update news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${row.newssubject}"?`);
    if (confirmed) {
      setNewsData(prev => prev.filter(news => news.id !== row.id));
      setSelectedRows(prev => prev.filter(id => id !== row.id));
      alert(`News "${row.newssubject}" has been deleted.`);
    }
  };

  const filteredData = useMemo(() => {
    return NewsData.filter((news) =>
      Object.values(news).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [NewsData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-5">
        <div style={{ 
          background: "#ffffff", 
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <h1 className="text-2xl font-bold text-gray-800">News</h1>
            
              <div className="flex flex-wrap justify-between items-center gap-4">
                     <div className="flex-1 min-w-[200px]">
                            <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search news..." />
                     </div>
                            <Button variant="primary" size="sm" className="whitespace-nowrap" onClick={() => navigate("/admin/news/create")}>
                                   Add News
                                   <i className="fa-solid fa-plus"></i>
                            </Button>
              </div>
          </div>

          {/* Table */}
          <Table
            data={currentData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            sortConfig={sortConfig}
            startIndex={startIndex}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultMapping={{
              'News Category': 'newscategory',
              'News Subject': 'newssubject',
              'Date Created': 'datecreated'
            }}
          />
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} news
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>

      {/* Edit Modal */}
      <ModalEdit
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        title="Edit News"
        data={editingNews}
        fields={modalFields}
        isLoading={isLoading}
      />
    </>
  );
};

export default News;