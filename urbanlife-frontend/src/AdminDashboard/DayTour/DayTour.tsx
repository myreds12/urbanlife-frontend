import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DayTour.css'; // Pastikan file ini ada di AdminDashboard/DayTour/

function DayTour() {
  // State untuk form
  const [formData, setFormData] = useState({
    packageName: 'Western and Eastern Nusa Penida Tour',
    englishDescription: '',
    indonesiaDescription: '',
    image: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit (placeholder)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Tambah logika simpan ke backend nanti
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (Bar) - Ini diasumsikan udah dihandle oleh App.tsx */}
      {/* Konten utama */}
      <main className=" p-6 flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Western and Eastern Nusa Penida Tour</h2>
          <div className="text-sm text-gray-500 mb-6 flex space-x-5">
            <span className="cursor-pointer underline-from-left relative">Description</span>
            <span className="cursor-pointer underline-from-left relative">Image</span>
            <span className="cursor-pointer underline-from-left relative">Itinerary</span>
            <span className="cursor-pointer underline-from-left relative ">Price</span>

            {/* Hapus Itinerary dan Price */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">Day tour package name</label>
              <input
                type="text"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md "
              />
            </div>

            <div className="flex space-x-4 mt-5">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">English</label>
                <textarea
                  name="englishDescription"
                  value={formData.englishDescription}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md h-32"
                  placeholder="Description"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Indonesia</label>
                <textarea
                  name="indonesiaDescription"
                  value={formData.indonesiaDescription}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md h-32"
                  placeholder="Description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Save Template
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default DayTour;