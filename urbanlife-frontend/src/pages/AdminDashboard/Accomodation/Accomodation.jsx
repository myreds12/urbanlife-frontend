import React from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';

const Accommodation = () => {
  const accommodationData = [
    { id: 'AC001', location: 'Bali', type: 'Hotel Stay', unit: 'Fourteen Roses' },
    { id: 'AC002', location: 'Jakarta', type: 'Apartment', unit: 'City View' },
  ];
  const columns = ['#', 'Booking ID', 'Location', 'Type of services', 'Unit', 'Action'];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Accommodation</h2>
        <button className="bg-cyan-600 text-white px-3 py-1 rounded-lg text-sm">Add Unit</button>
      </div>
      <Table data={accommodationData} columns={columns} />
    </div>
  );
};

export default Accommodation;