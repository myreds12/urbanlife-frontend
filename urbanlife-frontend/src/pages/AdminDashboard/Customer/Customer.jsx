import React from 'react';
import CustomerTable from '../../../components/AdminDashboard/Customer/CustomerTable';

const Customer = () => {
  const customerData = [
    { id: 'C001', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C002', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C003', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C004', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C005', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C006', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C007', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C008', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C009', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C010', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
  ];

  const columns = ['Customer name', 'Nationality', 'Email', 'Phone number', 'Gender', 'Date of birth', 'Action'];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Customer</h2>
      </div>
      <CustomerTable data={customerData} columns={columns} />
    </div>
  );
};

export default Customer;