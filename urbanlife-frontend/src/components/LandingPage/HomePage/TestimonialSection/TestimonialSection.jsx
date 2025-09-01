import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apiClient from '../../../AdminDashboard/Utils/ApiClient/apiClient';
import TestimonialCard from './TestimonialCard';
import Carousel from '../../../AdminDashboard/Utils/Ui/Carousel';

const TestimonialSection = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get('/testimonial', {
        params: { page: 1, take: 6 },
      });

      const data = res.data.data;
      const transformedTestimonials = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id,
            name: item.nama,
            occupation: item.pekerjaan,
            description: item.deskripsi,
            image_url: item.image_url || '/images/error/No_Images_Available.jpg',
          }))
        : [
            {
              id: data.id,
              name: data.nama,
              occupation: data.pekerjaan,
              description: data.deskripsi,
              image_url: data.image_url || '/images/error/No_Images_Available.jpg',
            },
          ];

      setTestimonials(transformedTestimonials);
    } catch (err) {
      console.error('❌ Failed to fetch testimonials:', err);
      setError(t('testimonial.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center gap-4 px-4 md:px-8 lg:px-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 max-w-[350px] mx-auto"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <div className="animate-pulse bg-gray-300 h-full w-full"></div>
              </div>
              <div className="animate-pulse bg-gray-300 h-6 w-24 mb-2 mx-auto"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-16 mb-2 mx-auto"></div>
            </div>
            <div className="text-center">
              <div className="animate-pulse bg-gray-300 h-4 w-32 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {t('discover.try')}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="playfair text-[#071C4D] text-[32px] font-bold mb-4">
            {t('testimonial.title')}
          </h2>
          <p className="text-gray-600 text-lg">{t('testimonial.subtitle')}</p>
        </div>

        {/* Testimonials Carousel */}
        {testimonials.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            {t('testimonial.no_data')}
          </p>
        ) : (
          <div className="relative">
            <Carousel
              items={testimonials}
              gap={24}
              renderItem={(testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )}
            />
            <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white/70 to-transparent z-10"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;