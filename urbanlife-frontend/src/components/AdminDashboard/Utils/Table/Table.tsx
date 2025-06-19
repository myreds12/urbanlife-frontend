import React from 'react';

const Table = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th key={index} className="p-2 text-left text-sm font-medium text-gray-600">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              {columns.map((column) => (
                column === 'Action' ? (
                  <td key={column} className="p-2">
                    <button className="bg-cyan-600 text-white px-2 py-1 rounded">Detail</button>
                  </td>
                ) : (
                  <td key={column} className="p-2 text-gray-700">{row[column.toLowerCase().replace(' ', '_')]}</td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;