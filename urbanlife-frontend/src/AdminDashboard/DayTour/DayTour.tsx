import React, { useState } from 'react';
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Bar) - Ini diasumsikan udah dihandle oleh App.tsx */}
      {/* Konten utama */}
      <main className="ml-1 p-6 flex-1"> {/* Ubah ml-56 jadi ml-1 */}
        <div className="bg-white p-6 rounded-md shadow-md"> {/* Ubah rounded-lg jadi rounded-md buat border lebih rapi */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Western and Eastern Nusa Penida Tour</h2>
          <div className="text-sm text-gray-500 mb-6 flex space-x-4">
            <span className="cursor-pointer hover:underline text-green-500">Description</span>
            <span className="cursor-pointer hover:underline">Image</span>
            <span className="cursor-pointer hover:underline">Itinerary</span>
            <span className="cursor-pointer hover:underline">Price</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">Day tour package name</label>
              <input
                type="text"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="flex space-x-4">
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

            <div className="flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
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