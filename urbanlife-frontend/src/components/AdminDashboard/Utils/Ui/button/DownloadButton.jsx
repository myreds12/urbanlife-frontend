import React from 'react';

const DownloadButton = ({ data, filename = 'data.csv' }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) return;

    const headers = [
      'Customer Name',
      'Nationality',
      'Email',
      'Phone Number',
      'Gender',
      'Date of Birth',
    ];

    const keys = [
      'customer_name',
      'nationality',
      'email',
      'phone_number',
      'gender',
      'date_of_birth',
    ];

    const csvRows = [
      headers.join(','),
      ...data.map(row => keys.map(key => `"${row[key] ?? ''}"`).join(',')),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
    >
      Download <i className="fa-solid fa-download" />
    </button>
  );
};

export default DownloadButton;
