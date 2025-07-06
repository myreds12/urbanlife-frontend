import React, {useState} from 'react';
import Table from '../../AdminDashboard/Utils/Table/Table';

const TourPrice = () => {
  const [TourPriceData] = useState([
    {count : '1 Person', adults : '1.400.000', kids : '1.400.000'},
    {count : '2 Person', adults : '2.400.000', kids : '2.400.000'},
    {count : '3 Person', adults : '3.400.000', kids : '3.400.000'},
    {count : '4 Person', adults : '4.400.000', kids : '4.400.000'},
    {count : '5 Person', adults : '5.400.000', kids : '5.400.000'},
    {count : '6 Person', adults : '6.400.000', kids : '6.400.000'},
  ]);

  const columns = ['Count', 'Adults', 'Kids'];

  return(
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <div className="overflow-x-auto">
        <Table
          data={TourPriceData}
          columns={columns}
        />
      </div>
   </div>
  );
};

export default TourPrice;