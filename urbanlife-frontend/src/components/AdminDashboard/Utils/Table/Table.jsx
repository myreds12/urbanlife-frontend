import React from 'react';
import Button from '../Ui/button/Button';
import StatusBadge from '../Ui/badge/StatusBadge';


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

// Icon components untuk delete dan edit
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const Table = ({
  data,
  columns,
  selectedRows = [],
  onRowSelect,
  onSort,
  sortConfig,
  startIndex = 0,
  // New props for custom actions
  actions = null, // Array of action objects: [{ type: 'detail', label: 'Detail', onClick: (row) => {} }]
  onEdit = null, // Function untuk handle edit
  onDelete = null // Function untuk handle delete
}) => {
  const defaultMapping = {
    '#': (row, index) => startIndex + index + 1,
    'Booking ID': 'id',
    'Location': 'location',
    'Type of services': 'type',
    'Unit': 'unit',
    'Customer name':(row) => row.customer_name || row.name || row.customer,
    'Nationality': 'nationality',
    'Email': 'email',
    'Phone number': 'phone_number',
    'Date of birth': 'date_of_birth',
    'Action': null,

    // Orders 
    'Type' : 'type',
    'Detail Order' : 'detail',
    'Date From' : 'datefrom',
    'Date To' : 'dateto',

    // WhatsappConnect columns:
    'Name': (row) => row.Name || row.name, // Support both Name and name
    'Category': (row) => row.Category,
    'No Admin 1': (row) => row['No Admin 1'],
    'No Admin 2': (row) => row['No Admin 2'],
    'Content': (row) => row.Content,
    'Status': (row) => row.Status || row.status, // Support both Status and status


    //* Data Master columns:
    // Countries columns:
    'Country ID': 'id',
    'Country': (row) => row.country || row.name,
    // City
    'City ID': 'id',
    'City': 'city',
    //Car
    'Unit ID': 'id',
    'Brand' : 'brand',
    'Model' : 'model',
    'PoliceNumber' : 'policeNumber',
    'TaxStatus' : 'taxStatus',
    'TaxExpiry' : 'taxExpiry',
    //Driver
    'Driver ID': 'id',
    'Driver Name': 'name',
    'IDdriver': 'iddriver',
    'Phone Number' : 'phone',
    'Driving Expiry Period' : 'expiry',
    'Gender' : 'gender',
    //Guide
    'Guide ID' : 'id',
    'Guide Name' : 'name',
    'IDguide' : 'idguide',
    'Fluent English' : 'english',

    //DaytourDetail -- TourPrice
    'Count' : 'count',
    'Adults' : 'adults',
    'Kids' : 'kids',
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

  // Render action buttons
  const renderActionButtons = (row) => {
    // Jika ada custom actions, gunakan itu
    if (actions && actions.length > 0) {
      return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              size={action.size || "sm"}
              onClick={() => action.onClick(row)}
              style={action.style}
            >
              {action.icon && <span style={{ marginRight: action.label ? '4px' : '0' }}>{action.icon}</span>}
              {action.label}
            </Button>
          ))}
        </div>
      );
    }

    // Jika ada onEdit dan onDelete (untuk Customer dan Countries), tampilkan icon buttons
    if (onEdit || onDelete) {
      return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {onEdit && (
            <button
              onClick={() => onEdit(row)}
              className="action-button edit-button"
              title="Edit"
            >
              <EditIcon />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row)}
              className="action-button delete-button"
              title="Delete"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      );
    }

    // Default fallback untuk RentCar dan Accommodation (Detail button)
    return (
      <Button variant="outline" size="sm">
        Detail
      </Button>
    );
  };

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      <style>
        {`
          .action-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 6px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            width: 28px;
            height: 28px;
          }
          
          .delete-button {
            color: #ef4444;
          }
          
          .delete-button:hover {
            background-color: #fee2e2 !important;
            transform: scale(1.05);
          }
          
          .edit-button {
            color: #3b82f6;
          }
          
          .edit-button:hover {
            background-color: #dbeafe !important;
            transform: scale(1.05);
          }
          
          .action-button:active {
            transform: scale(0.95);
          }
        `}
      </style>
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
                  className="h-4 w-4 text-gray-600 rounded focus:ring-0 focus:outline-none border-gray-300"
                />
                </th>
              )}

              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    padding: "10px 24px",
                    fontWeight: "700",
                    color: "#595D65",
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
            className="h-4 w-4 text-gray-600 rounded focus:ring-0 focus:outline-none border-gray-300"
          />
        </td>
      )}

      {columns.map((column) =>
        column === 'Action' ? (
          <td key={column} style={{ padding: "5px 24px" }}>
            {renderActionButtons(row)}
          </td>
        ) : (
          <td
            key={column}
            style={{
              padding: "7px 24px",
              color: "#6b7280",
              fontSize: "12px"
            }}
          >
            {column === 'Status' ? (
              <StatusBadge status={typeof defaultMapping[column] === 'function'
                ? defaultMapping[column](row, rowIndex)
                : row[defaultMapping[column]] || ''} />
            ) : (
              typeof defaultMapping[column] === 'function'
                ? defaultMapping[column](row, rowIndex)
                : row[defaultMapping[column]] || ''
            )}
          </td>
        )
      )}
    </tr>
  ))}
</tbody>        </table>
      </div>
    </div>
  );
};

export default Table;