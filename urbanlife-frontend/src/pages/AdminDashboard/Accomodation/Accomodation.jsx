import React, { useState } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import CreateAcco from './CreateAccomodation';

const Accommodation = () => {
  const [accommodationData, setAccommodationData] = useState([
    { id: 'AC001', location: 'Bali', type: 'Hotel Stay', unit: 'Fourteen Roses' },
    { id: 'AC002', location: 'Jakarta', type: 'Apartment', unit: 'City View' },
    { id: 'AC003', location: 'Yogyakarta', type: 'Villa', unit: 'Traditional House' },
    { id: 'AC004', location: 'Bandung', type: 'Hotel Stay', unit: 'Mountain Resort' },
    { id: 'AC005', location: 'Surabaya', type: 'Apartment', unit: 'Business District' },
    { id: 'AC006', location: 'Lombok', type: 'Resort', unit: 'Beach Paradise' },
    { id: 'AC007', location: 'Malang', type: 'Villa', unit: 'Highland Retreat' },
    { id: 'AC008', location: 'Semarang', type: 'Hotel Stay', unit: 'City Center' },
    { id: 'AC009', location: 'Bali', type: 'Hotel Stay', unit: 'Fourteen Roses' },
    { id: 'AC0010', location: 'Jakarta', type: 'Apartment', unit: 'City View' },
    { id: 'AC0011', location: 'Yogyakarta', type: 'Villa', unit: 'Traditional House' },
    { id: 'AC0012', location: 'Bandung', type: 'Hotel Stay', unit: 'Mountain Resort' },
    { id: 'AC0013', location: 'Surabaya', type: 'Apartment', unit: 'Business District' },
    { id: 'AC0014', location: 'Lombok', type: 'Resort', unit: 'Beach Paradise' },
    { id: 'AC0015', location: 'Malang', type: 'Villa', unit: 'Highland Retreat' },
    { id: 'AC0016', location: 'Semarang', type: 'Hotel Stay', unit: 'City Center' },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 5;
  const columns = ['#', 'Booking ID', 'Location', 'Type of services', 'Unit', 'Action'];

  // Calculate pagination - langsung pake accommodationData
  const totalPages = Math.ceil(accommodationData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = accommodationData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddUnit = (newUnit) => {
    setAccommodationData((prev) => [
      ...prev,
      {
        id: `AC${(prev.length + 1).toString().padStart(3, '0')}`,
        location: newUnit.location,
        type: newUnit.type,
        unit: newUnit.unit,
      },
    ]);
    // Reset to first page after adding new data
    setCurrentPage(1);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Accommodation</h2>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            Add Unit
          </Button>
        </div>
      </div>

      <Table 
        data={currentData} 
        columns={columns}
        startIndex={startIndex}
      />

      {/* Data info dan Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Data info */}
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, accommodationData.length)} of {accommodationData.length} accommodations
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>

      <CreateAcco
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUnit}
      />
    </div>
  );
};

export default Accommodation;