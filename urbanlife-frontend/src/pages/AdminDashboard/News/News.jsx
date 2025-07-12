import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import EditNews from './EditNews';

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
    { 
      id: 'N001', 
      newscategory: 'Culture', 
      newssubject: 'Barong Dance', 
      datecreated: '09/07/2025',
      description_en: 'Apart from its natural beauty, Bali is also famous for its arts and culture. One of them is a traditional dance called Barong Dance that tells a battle between Barong, a creature that looks like a lion with a red head, which represents good spirits and Rangda, the demon queen in Balinese mythology.',
      description_id: 'Selain keindahan alamnya, Bali juga terkenal dengan seni dan budayanya. Salah satunya adalah tarian tradisional yang disebut Tari Barong yang menceritakan pertempuran antara Barong dan Rangda.'
    },
    { 
      id: 'N002', 
      newscategory: 'Culture', 
      newssubject: 'Traditional Music Festival', 
      datecreated: '10/07/2025',
      description_en: 'Traditional music festival showcasing the rich cultural heritage of the region.',
      description_id: 'Festival musik tradisional yang menampilkan kekayaan warisan budaya daerah.'
    },
    { 
      id: 'N003', 
      newscategory: 'Tourism', 
      newssubject: 'New Tourist Destination', 
      datecreated: '11/07/2025',
      description_en: 'A new tourist destination has been discovered with breathtaking natural beauty.',
      description_id: 'Destinasi wisata baru telah ditemukan dengan keindahan alam yang menakjubkan.'
    },
    { 
      id: 'N004', 
      newscategory: 'Culture', 
      newssubject: 'Art Exhibition', 
      datecreated: '12/07/2025',
      description_en: 'Art exhibition featuring local artists and their masterpieces.',
      description_id: 'Pameran seni yang menampilkan seniman lokal dan karya masterpiece mereka.'
    },
    { 
      id: 'N005', 
      newscategory: 'Tourism', 
      newssubject: 'Beach Resort Opening', 
      datecreated: '13/07/2025',
      description_en: 'New luxury beach resort opening with world-class facilities.',
      description_id: 'Pembukaan resort pantai mewah baru dengan fasilitas kelas dunia.'
    },
    { 
      id: 'N006', 
      newscategory: 'Culture', 
      newssubject: 'Cultural Workshop', 
      datecreated: '14/07/2025',
      description_en: 'Cultural workshop teaching traditional crafts and skills.',
      description_id: 'Workshop budaya yang mengajarkan kerajinan dan keterampilan tradisional.'
    },
    { 
      id: 'N007', 
      newscategory: 'Tourism', 
      newssubject: 'Mountain Hiking Trail', 
      datecreated: '15/07/2025',
      description_en: 'New mountain hiking trail with scenic views and adventure activities.',
      description_id: 'Jalur pendakian gunung baru dengan pemandangan indah dan aktivitas petualangan.'
    },
    { 
      id: 'N008', 
      newscategory: 'Culture', 
      newssubject: 'Dance Performance', 
      datecreated: '16/07/2025',
      description_en: 'Traditional dance performance celebrating local culture and heritage.',
      description_id: 'Pertunjukan tari tradisional yang merayakan budaya dan warisan lokal.'
    },
    { 
      id: 'N009', 
      newscategory: 'Tourism', 
      newssubject: 'Local Food Festival', 
      datecreated: '17/07/2025',
      description_en: 'Local food festival featuring authentic regional cuisine.',
      description_id: 'Festival makanan lokal yang menampilkan masakan daerah yang autentik.'
    },
    { 
      id: 'N010', 
      newscategory: 'Culture', 
      newssubject: 'Historical Site Visit', 
      datecreated: '18/07/2025',
      description_en: 'Guided visit to historical sites with rich cultural significance.',
      description_id: 'Kunjungan terpandu ke situs bersejarah dengan makna budaya yang kaya.'
    },
    { 
      id: 'N011', 
      newscategory: 'Tourism', 
      newssubject: 'Island Hopping Tour', 
      datecreated: '19/07/2025',
      description_en: 'Island hopping tour exploring multiple beautiful islands.',
      description_id: 'Tur island hopping menjelajahi beberapa pulau indah.'
    },
    { 
      id: 'N012', 
      newscategory: 'Culture', 
      newssubject: 'Traditional Craft Fair', 
      datecreated: '20/07/2025',
      description_en: 'Traditional craft fair showcasing local artisans and their products.',
      description_id: 'Pameran kerajinan tradisional yang menampilkan pengrajin lokal dan produk mereka.'
    },
    { 
      id: 'N013', 
      newscategory: 'Tourism', 
      newssubject: 'Adventure Sports Event', 
      datecreated: '21/07/2025',
      description_en: 'Adventure sports event featuring various outdoor activities.',
      description_id: 'Acara olahraga petualangan yang menampilkan berbagai aktivitas outdoor.'
    },
    { 
      id: 'N014', 
      newscategory: 'Culture', 
      newssubject: 'Music and Dance Show', 
      datecreated: '22/07/2025',
      description_en: 'Music and dance show featuring traditional and contemporary performances.',
      description_id: 'Pertunjukan musik dan tari yang menampilkan pertunjukan tradisional dan kontemporer.'
    },
  ]);

  const columns = ['News Category', 'News Subject', 'Date Created', 'Action'];

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

  // Updated handleModalSave to work with NewsEditModal
  const handleModalSave = async (updatedData) => {
    try {
      // Update the news data
      setNewsData(prev => prev.map(news => 
        news.id === editingNews.id 
          ? { ...news, ...updatedData }
          : news
      ));
      
      // Close modal
      handleModalClose();
      
    } catch (error) {
      console.error('Error updating news:', error);
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

      {/* News Edit Modal */}
      <EditNews
        isOpen={isModalOpen}
        onClose={handleModalClose}
        newsData={editingNews}
        onSave={handleModalSave}
      />
    </>
  );
};

export default News;