import React from 'react';

const DownloadButton = ({ data, filename = 'data.csv' }) => {
  const handleDownload = () => {
    const csvContent = [
      ['Customer Name', 'Nationality', 'Email', 'Phone Number', 'Gender', 'Date of Birth'],
      ...data.map(row => [
        row.customer_name,
        row.nationality,
        row.email,
        row.phone_number,
        row.gender,
        row.date_of_birth,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
    >
      Download
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
    </button>
  );
};

export default DownloadButton;
