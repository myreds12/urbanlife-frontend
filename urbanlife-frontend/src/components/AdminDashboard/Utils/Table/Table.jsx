import React from 'react';
import Button from '../Ui/button/Button';

const Table = ({ 
  data, 
  columns, 
  selectedRows = [], 
  onRowSelect, 
  onSort, 
  sortConfig,
  startIndex = 0 // tambah prop ini
}) => {
  const defaultMapping = {
    '#': (row, index) => startIndex + index + 1, // update logic ini
    'Booking ID': 'id',
    'Location': 'location',
    'Type of services': 'type',
    'Unit': 'unit',
    'Customer name': 'customer_name',
    'Nationality': 'nationality',
    'Email': 'email',
    'Phone number': 'phone_number',
    'Gender': 'gender',
    'Date of birth': 'date_of_birth',
    'Action': null,
  };

  const handleSort = (column) => {
    const mappedKey = defaultMapping[column];
    if (mappedKey && typeof mappedKey === 'string' && onSort) {
      onSort(mappedKey);
    }
  };

  const getSortIcon = (column) => {
    const mappedKey = defaultMapping[column];
    if (!sortConfig || sortConfig.key !== mappedKey) return ' ↕️';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      <div style={{ overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb" }}>
              {/* Checkbox column untuk select all */}
              {onRowSelect && (
                <th style={{
                  padding: "12px 24px",
                  fontWeight: "500",
                  color: "#6b7280",
                  textAlign: "left",
                  fontSize: "12px",
                  width: "50px"
                }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        data.forEach(row => {
                          if (!selectedRows.includes(row.id)) {
                            onRowSelect(row.id);
                          }
                        });
                      } else {
                        selectedRows.forEach(id => onRowSelect(id));
                      }
                    }}
                  />
                </th>
              )}
              
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    padding: "12px 24px",
                    fontWeight: "500",
                    color: "#6b7280",
                    textAlign: "left",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: defaultMapping[column] && typeof defaultMapping[column] === 'string' && onSort ? 'pointer' : 'default'
                  }}
                  onClick={() => handleSort(column)}
                >
                  {column}
                  {defaultMapping[column] && typeof defaultMapping[column] === 'string' && onSort && getSortIcon(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  borderBottom: rowIndex < data.length - 1 ? "1px solid #f3f4f6" : "none",
                  transition: "all 0.2s ease",
                  backgroundColor: selectedRows.includes(row.id) ? "#dbeafe" : "transparent",
                  borderLeft: selectedRows.includes(row.id) ? "3px solid #3b82f6" : "3px solid transparent",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  if (!selectedRows.includes(row.id)) {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedRows.includes(row.id)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {/* Checkbox column untuk individual row */}
                {onRowSelect && (
                  <td style={{ padding: "10px 24px" }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onRowSelect(row.id)}
                    />
                  </td>
                )}
                
                {columns.map((column) =>
                  column === 'Action' ? (
                    <td key={column} style={{ padding: "10px 24px" }}>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </td>
                  ) : (
                    <td
                      key={column}
                      style={{
                        padding: "10px 24px",
                        color: "#6b7280",
                        fontSize: "14px"
                      }}
                    >
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
    </div>
  );
};

export default Table;