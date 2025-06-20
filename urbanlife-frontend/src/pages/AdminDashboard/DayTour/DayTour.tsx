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
  const [photos, setPhotos] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Western and Eastern Nusa Penida Tour</h2>
          <div className="text-sm text-gray-500 mb-6 flex space-x-5">
            <span
              className={`cursor-pointer ${activeSection === 'description' ? 'text-cyan-600' : 'text-gray-500'} hover:text-cyan-700 underline-from-left relative`}
              onClick={() => moveSection('description')}
            >
              Description
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'image' ? 'text-cyan-600' : 'text-gray-500'} hover:text-cyan-700 underline-from-left relative`}
              onClick={() => moveSection('image')}
            >
              Image
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'itinerary' ? 'text-cyan-600' : 'text-gray-500'} hover:text-cyan-700 underline-from-left relative`}
              onClick={() => moveSection('itinerary')}
            >
              Itinerary
            </span>
            <span
              className={`cursor-pointer ${activeSection === 'price' ? 'text-cyan-600' : 'text-gray-500'} hover:text-cyan-700 underline-from-left relative`}
              onClick={() => moveSection('price')}
            >
              Price
            </span>
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
          <ItinerarySection id="itinerary" isActive={activeSection === 'itinerary'} />
          <PriceSection id="price" isActive={activeSection === 'price'} />
        </div>
      </main>
    </div>
  );
}

export default DayTour;