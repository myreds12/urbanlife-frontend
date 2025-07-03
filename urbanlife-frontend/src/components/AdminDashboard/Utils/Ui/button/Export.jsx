import React from 'react';

const Export = ({ 
  data, 
  filename = "export.csv", 
  className = "",
  disabled = false,
  customHeaders = null // Optional custom headers
}) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const dataKeys = Object.keys(data[0]);
    const headers = customHeaders || dataKeys;

    // Escape CSV values + protect long/short date formats from Excel formatting
    const escapeCsvValue = (value) => {
      if (value === null || value === undefined) {
        return '""';
      }

      let stringValue = String(value).trim();

      // Deteksi format tanggal umum
      const isShortDate = /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(stringValue); // e.g., 20-02-2025 or 20/02/2025
      const isLongDate = /^\d{1,2} [A-Za-z]+ \d{4}$/.test(stringValue); // e.g., 27 June 2025

      if (isShortDate || isLongDate) {
        // Bungkus jadi formula string agar Excel tidak format otomatis
        stringValue = `="${stringValue}"`;
      }

      // Escape internal quotes
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const separator = ';';
    const BOM = '\uFEFF';
    const csvRows = [];

    // Header row
    csvRows.push(headers.map(header => escapeCsvValue(header)).join(separator));

    // Data rows
    data.forEach(row => {
      const rowData = dataKeys.map(key => escapeCsvValue(row[key]));
      csvRows.push(rowData.join(separator));
    });

    const csvContent = BOM + csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled}
      className={`bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${className}`}>
      Download
      <i className="fa-solid fa-download" />
    </button>
  );
};

export default Export;
