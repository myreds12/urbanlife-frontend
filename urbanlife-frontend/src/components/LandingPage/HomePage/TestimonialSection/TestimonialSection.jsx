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
      <div className="flex justify-center gap-6 px-4 md:px-8 lg:px-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 max-w-[350px] mx-auto animate-pulse"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-300"></div>
              <div className="h-6 w-24 mb-2 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 mb-2 bg-gray-300 rounded"></div>
            </div>
            <div className="text-center">
              <div className="h-4 w-32 mx-auto bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          {t('discover.try')}
        </button>
      </div>
    );
  }

  return (
    <section className="pt-12 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="playfair text-[#071C4D] text-4xl font-bold mb-3">
            {t('testimonial.title')}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{t('testimonial.subtitle')}</p>
        </div>

        {/* Testimonials Carousel */}
        {testimonials.length === 0 ? (
          <p className="text-gray-500 italic text-center">{t('testimonial.no_data')}</p>
        ) : (
          <div className="relative">
            <Carousel
              items={testimonials}
              gap={24}
              renderItem={(testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )}
              // Optional: add navigation buttons if your Carousel supports
              // showArrows={true}
              // arrowsClassName="custom-arrow-class"
            />
            <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-50 via-gray-50/70 to-transparent z-10"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;
