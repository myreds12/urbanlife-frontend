import React from 'react';
import Button from '../Ui/button/Button';

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
                    letterSpacing: "0.05em"
                  }}
                >
                  {column}
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
                  transition: "background-color 0.2s ease"
                }}
              >
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