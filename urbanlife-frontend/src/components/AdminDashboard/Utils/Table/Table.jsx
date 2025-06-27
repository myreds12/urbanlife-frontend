import React from 'react';
import Button from '../Ui/button/Button';

// Komponen SVG Icon Sort
const SortIcon = ({ direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width="12"
      height="12"
      style={{
        marginLeft: '6px',
        transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.2s'
      }}
    >
      <path
        fill="#6b7280"
        d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
      />
    </svg>
  );
};

const Table = ({
  data,
  columns,
  selectedRows = [],
  onRowSelect,
  onSort,
  sortConfig,
  startIndex = 0
}) => {
  const defaultMapping = {
    '#': (row, index) => startIndex + index + 1,
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
    if (!sortConfig || sortConfig.key !== mappedKey) {
      return <SortIcon direction={null} />;
    }
    return <SortIcon direction={sortConfig.direction} />;
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
              {onRowSelect && (
                <th style={{
                  padding: "10px 24px",
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
                    padding: "10px 24px",
                    fontWeight: "700",
                    color: "#6b7280",
                    textAlign: "left",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: defaultMapping[column] && typeof defaultMapping[column] === 'string' && onSort ? 'pointer' : 'default'
                  }}
                  onClick={() => handleSort(column)}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {column}
                    {defaultMapping[column] && typeof defaultMapping[column] === 'string' && onSort && getSortIcon(column)}
                  </span>
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
                    <td key={column} style={{ padding: "5px 24px" }}>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </td>
                  ) : (
                    <td
                      key={column}
                      style={{
                        padding: "5px 24px",
                        color: "#6b7280",
                        fontSize: "12px"
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
