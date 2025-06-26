import React, { useState } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button';
import CreateAcco from './CreateAccomodation';

const Accommodation = () => {
  const [accommodationData, setAccommodationData] = useState([
    { id: 'AC001', location: 'Bali', type: 'Hotel Stay', unit: 'Fourteen Roses' },
    { id: 'AC002', location: 'Jakarta', type: 'Apartment', unit: 'City View' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = ['#', 'Booking ID', 'Location', 'Type of services', 'Unit', 'Action'];

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
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Accommodation</h2>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          Add Unit
        </Button>
      </div>
      <Table data={accommodationData} columns={columns} />
      <CreateAcco
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUnit}
      />
    </div>
  );
};

export default Accommodation;