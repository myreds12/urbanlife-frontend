import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DescriptionSection from '../../../components/AdminDashboard/DayTour/DescriptionSection';
import ImageSection from '../../../components/AdminDashboard/DayTour/ImageSection';
import ItinerarySection from '../../../components/AdminDashboard/DayTour/ItinerarySection';
import PriceSection from '../../../components/AdminDashboard/DayTour/PriceSection';
import '../../../styles/AdminDashboard/DayTour/DayTour.css';

function DayTour() {
  const [formData, setFormData] = useState({
    packageName: 'Western and Eastern Nusa Penida Tour',
    englishDescription: '',
    indonesiaDescription: '',
    image: '',
  });

  const [activeSection, setActiveSection] = useState('description');
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhotos((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen">
      <main className="p-6 flex-1">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Western and Eastern Nusa Penida Tour
          </h2>
          <div className="text-sm text-gray-500 mb-6 flex space-x-5">
            {['description', 'image', 'itinerary', 'price'].map((section) => (
              <span
              key={section}
              className={`cursor-pointer relative ${
                activeSection === section ? 'text-cyan-600' : 'text-gray-500'
              } hover:text-cyan-700 group`}
              onClick={() => moveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-200"></span>
            </span>
            ))}
          </div>

          <DescriptionSection
            id="description"
            isActive={activeSection === 'description'}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <ImageSection
            id="image"
            isActive={activeSection === 'image'}
            photos={photos}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
          />

          <ItinerarySection
            id="itinerary"
            isActive={activeSection === 'itinerary'}
          />

          <PriceSection
            id="price"
            isActive={activeSection === 'price'}
          />
        </div>
      </main>
    </div>
  );
}

export default DayTour;
