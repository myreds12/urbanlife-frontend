import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/DayTour/DayTour.css';

function DayTour() {
  // State untuk form
  const [formData, setFormData] = useState({
    packageName: 'Western and Eastern Nusa Penida Tour',
    englishDescription: '',
    indonesiaDescription: '',
    image: '',
  });

  const [activeSection, setActiveSection] = useState('description');
  const [photos, setPhotos] = useState<string[]>([]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Handle submit (placeholder)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Tambah logika simpan ke backend nanti
  };

  const moveSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhotos((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen">
      <main className="p-6 flex-1">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Western and Eastern Nusa Penida Tour</h2>
          <div className="text-sm text-gray-500 mb-6 flex space-x-5">
            <span
              className={`cursor-pointer ${activeSection === 'description' ? 'text-green-500' : 'text-gray-500'} hover:text-green-500 underline-from-left relative`}
              onClick={() => moveSection('description')}
            >
              Description
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'image' ? 'text-green-500' : 'text-gray-500'} hover:text-green-500 underline-from-left relative`}
              onClick={() => moveSection('image')}
            >
              Image
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'itinerary' ? 'text-green-500' : 'text-gray-500'} hover:text-green-500 underline-from-left relative`}
              onClick={() => moveSection('itinerary')}
            >
              Itinerary
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'price' ? 'text-green-500' : 'text-gray-500'} hover:text-green-500 underline-from-left relative`}
              onClick={() => moveSection('price')}
            >
              Price
            </span>
          </div>

          {/* Description Section */}
          <div id="description" className={activeSection === 'description' ? 'block' : 'hidden'}>
            <div className="p-6 rounded-lg shadow-md shadow-black/20">
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

                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">English</label>
                    <div className="mt-3"><span className="text-red-500 mr-1">*</span> Description </div>
                    <textarea
                      name="englishDescription"
                      value={formData.englishDescription}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md h-60"
                    
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Indonesia</label>
                    <div className="mt-3"><span className="text-red-500 mr-1">*</span> Description </div>
                    <textarea
                      name="indonesiaDescription"
                      value={formData.indonesiaDescription}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md h-60"
                    
                    />
                  </div>
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
          </div>

          {/* Image Section */}
          <div id="image" className={activeSection === 'image' ? 'block' : 'hidden'}>
            <div className="p-6 rounded-lg shadow-md shadow-black/20">
              <div className="flex items-center mb-4">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photoUpload" />
                <label
                  htmlFor="photoUpload"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                >
                  Add Photo
                </label>
              </div>
              <div className="grid grid-cols-5">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img src={photo} alt={`Tour photo ${index + 1}`} className="w-40 h-50 mt-2 object-cover rounded-md" />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-0 right-10 bg-zinc-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <div id="itinerary" className={activeSection === 'itinerary' ? 'block' : 'hidden'}>
            <div className="p-6 rounded-lg shadow-md shadow-black/20">
              {/* nyusul */}
            </div>
          </div>

          {/* Price Section */}
          <div id="price" className={activeSection === 'price' ? 'block' : 'hidden'}>
            <div className="p-6 rounded-lg shadow-md shadow-black/20">
              {/* nyusul */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DayTour;