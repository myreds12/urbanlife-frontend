import React from 'react';

const Table = ({ data, columns }) => {
  // Default mapping berdasarkan nama kolom umum
  const defaultMapping = {
    '#': (row, index) => index + 1,
    'Booking ID': 'id',
    'Location': 'location',
    'Type of services': 'type',
    'Unit': 'unit',
    'Action': null, // Action akan dihandle khusus
  };

  return (
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((column, index) => (
                    <th key={index} className="p-2 text-left text-xs font-medium text-gray-600">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) =>
                  column === 'Action' ? (
                    <td key={column} className="p-2">
                      <button className="border border-cyan-600 text-cyan-600 px-1 py-0.5 text-xs rounded-md">
                        Detail
                      </button>
                    </td>
                  ) : (
                    <td key={column} className="p-2 text-xs text-gray-700">
                      {typeof defaultMapping[column] === 'function'
                        ? defaultMapping[column](row, rowIndex)
                        : row[defaultMapping[column]] || ''}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default Table;