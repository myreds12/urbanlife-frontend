import React, { useEffect, useState } from 'react';
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from 'react-i18next';

const TestimonialSection = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await apiClient.get("/testimonial", {
        params: { page: 1, take: 6 }
      });
      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="discover-card">
            <div className="image-container">
              <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
              <div className="description">
                <div className="animate-pulse bg-gray-300 h-6 w-24 mb-2"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-16 mb-2"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-32"></div>
              </div>
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
          {t("discover.try")}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="playfair text-[#071C4D] text-[32px] font-bold mb-4">
            {t('testimonial.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('testimonial.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src={testimonial.image_url || "/images/error/No_Images_Available.jpg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[#071C4D] text-lg font-semibold mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 text-sm italic">
                  ( {testimonial.occupation} )
                </p>
              </div>

              {/* Review */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-base italic leading-loose text-center">
                  "{testimonial.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
