import React from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';

const RentCar = () => {
  const rentCarData = [
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
  ];

  const columns = ['#', 'Booking ID', 'Location', 'Type of services', 'Unit', 'Action'];

  const handleAddUnit = () => {
    console.log('Add Unit clicked');
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Rent car</h2>
        <button
          onClick={handleAddUnit}
          className="bg-cyan-600 text-white px-3 py-1 rounded text-sm"
        >
          Add Unit
        </button>
      </div>
      <Table data={rentCarData} columns={columns} />
    </div>
  );
};

export default RentCar;