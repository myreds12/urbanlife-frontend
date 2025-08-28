import React from 'react';

const TourPolicies = ({ policies }) => {
  if (!policies || typeof policies !== "string" || policies.trim() === "") {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm text-gray-500">
        No policies available.
      </div>
    );
  }

  // Jika policies adalah string dengan pemisah baris, misal '\n', kita bisa split dan render per baris:
  const policyLines = policies.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      {policyLines.map((line, index) => (
        <div key={index} className="flex gap-2">
          <p className="text-gray-700">{line}</p>
        </div>
      ))}
    </div>
  );
};

export default TourPolicies;
