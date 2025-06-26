import React, { useState } from 'react';

const CustomerTable = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  // Filter data berdasarkan search
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginasi
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSort = (column) => {
    // Logika sort sederhana (bisa diperluas oleh tim BE)
    console.log(`Sorting by ${column}`);
  };

  const handleSelectRow = (index) => {
    const rowId = currentData[index].id;
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((row) => row.id));
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-gray-200 p-2 rounded-lg fa--download">Download</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left text-xs font-medium text-gray-600">
              <input
              type="checkbox"
              className="w-4 h-4 border-2 border-gray-500 rounded focus:ring-2 focus:ring-green-500 checked:bg-green-500"
              checked={selectedRows.length === currentData.length && currentData.length > 0}
              onChange={handleSelectAll}
            />
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  className="p-2 text-left text-xs font-medium text-gray-600 cursor-pointer"
                  onClick={() => handleSort(column)}
                >
                  {column} <span className="ml-1">▼</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-gray-500 rounded focus:ring-2 focus:ring-green-500 checked:bg-green-500"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column} className="p-2 text-xs text-gray-700">
                    {row[column.toLowerCase().replace(' ', '_')] || ''}
                  </td>
                ))}
                <td className="p-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 ml-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex items-center -space-x-px">
          <button
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage === 1 ? 'disabled' : ''
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-700 bg-white border border-gray-300">
            {currentPage}
          </span>
          <button
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>    
    </div>
  );
};

export default CustomerTable;