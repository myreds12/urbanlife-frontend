import React, { useState } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import CreateRentCar from './CreateRentCar';

const RentCar = () => {
  const [rentCarData, setRentCarData] = useState([
    { id: 'ID001', location: 'Bali', type: 'Bali Airport Transfer Service', unit: '-' },
    { id: 'ID002', location: 'Bali', type: 'Bali Car Rental', unit: 'Toyota Hiace' },
    { id: 'ID003', location: 'Bali', type: 'Bali Car Rental', unit: 'Hyundai H-1' },
    { id: 'ID004', location: 'Bali', type: 'Bali Car Rental', unit: 'Toyota Innova Reborn' },
    { id: 'ID005', location: 'Bali', type: 'Bali Car Rental', unit: 'All New Honda BR-V' },
    { id: 'ID006', location: 'Bali', type: 'Bali Motorbike Rental', unit: '-' },
    { id: 'ID007', location: 'Bali', type: 'Transportation to/from Sanur Pier', unit: '-' },
    { id: 'ID008', location: 'Jakarta', type: 'Jakarta Car Rental', unit: 'Daihatsu Xenia' },
    { id: 'ID009', location: 'Jakarta', type: 'Jakarta Car Rental', unit: 'Toyota Avanza' },
    { id: 'ID010', location: 'Jakarta', type: 'Jakarta Car Rental', unit: 'Wuling Confero' },
    { id: 'ID011', location: 'Yogyakarta', type: 'Yogya Car Rental', unit: 'Honda Brio' },
    { id: 'ID012', location: 'Bandung', type: 'Bandung Car Rental', unit: 'Suzuki Ertiga' },
    { id: 'ID013', location: 'Surabaya', type: 'Surabaya Car Rental', unit: 'Toyota Calya' },
    { id: 'ID014', location: 'Lombok', type: 'Lombok Car Rental', unit: 'Daihatsu Sigra' },
    { id: 'ID015', location: 'Malang', type: 'Malang Car Rental', unit: 'Mitsubishi Xpander' },
    { id: 'ID016', location: 'Semarang', type: 'Semarang Car Rental', unit: 'Toyota Rush' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 5;
  const columns = ['#', 'Booking ID', 'Location', 'Type of services', 'Unit', 'Action'];

  // Calculate pagination - langsung pake rentCarData
  const totalPages = Math.ceil(rentCarData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = rentCarData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddUnit = (newUnit) => {
    setRentCarData((prev) => [
      ...prev,
      {
        id: `ID${(prev.length + 1).toString().padStart(3, '0')}`,
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Rent Car</h2>
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
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, rentCarData.length)} of {rentCarData.length} rent cars
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>

      <CreateRentCar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUnit}
      />
    </div>
  );
};

export default RentCar;