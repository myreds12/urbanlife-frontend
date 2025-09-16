// src/pages/LandingPage/AboutUs/AboutUs.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Calendar,
  Car,
  Bike,
  Ship,
  ArrowRight,
  Plane,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  Award,
} from "lucide-react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";
import apiClient from "../../../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

// Dummy data as fallback
const dummyData = {
  header: {
    title: "About UrbanLife",
    tagline:
      "Your trusted partner for seamless travel experiences in Bali and Jakarta",
  },
  story: {
    title: "Our Story",
    description:
      "UrbanLife was founded with a passion for making travel in Bali and Jakarta effortless and memorable. Since 2018, we've been helping travelers explore the vibrant culture, stunning landscapes, and hidden gems of these iconic destinations.",
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    ],
  },
  services: [
    {
      id: "private-car",
      title: "Private Car with Driver",
      description:
        "Explore Bali and Jakarta with our English-speaking drivers.",
      location: "Bali & Jakarta",
      icon: "car",
    },
    {
      id: "airport-transfer",
      title: "Airport Transfer",
      description: "Hassle-free pick-up and drop-off services.",
      location: "Bali & Jakarta",
      icon: "plane",
    },
  ],
  operationalSchedule: {
    title: "Operational Hours",
    description:
      "We are committed to providing excellent service during our operational hours.",
    schedule: [
      { day: "Monday", time: "08:00 - 17:00" },
      { day: "Sunday", time: "08:00 - 17:00", highlight: true },
    ],
    buttonText: "Contact Us Now",
    buttonLink: "/contact",
  },
  achievements: {
    title: "Our Achievements",
    subtitle: "Trusted by thousands of travelers across Indonesia",
    stats: [
      { number: "15,000+", label: "Happy Customers", icon: "users" },
      { number: "4.9", label: "Average Rating", icon: "star" },
    ],
  },
  cta: {
    title: "Ready to Explore?",
    description: "Book your next adventure with urbanlife!",
    buttonText: "Contact Us",
    buttonLink: "/contact",
    ctaButtonText: "Book Now",
    ctaButtonLink: "/booking",
  },
};

// Modern Carousel Component
const ModernCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [goToNext, isAutoPlaying]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 p-2 shadow-lg">
        <div className="relative h-64 overflow-hidden rounded-xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
                }`}
            >
              <img
                src={image}
                alt={`UrbanLife Experience ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ))}
        </div>
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-cyan-600 w-8"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [aboutData, setAboutData] = useState(dummyData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/aboutus");
        const data = response.data.data[0]; // Ambil data dari item pertama
        console.log(data, "ABOUT US DATA");

        // Mengatur data ke dalam format yang sesuai
        const formattedData = {
          header: {
            title: data.title_en,
            tagline: data.content_en,
          },
          story: {
            title: data.AboutUsStory.title_en,
            description: data.AboutUsStory.content_en,
            // SESUDAH (sudah diperbaiki):
            images: (() => {
              const validImages = data.AboutUsFile
                .filter((file) => {
                  // Filter hanya file yang merupakan gambar
                  const fileName = file.nama_file || file.url;
                  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
                  return imageExtensions.some(ext => 
                    fileName.toLowerCase().includes(ext.toLowerCase())
                  );
                })
                .map((file) =>
                  `${apiClient.defaults.baseURL}/public/${file.url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`
                );
              
              // Fallback ke dummy images jika tidak ada gambar valid
              return validImages.length > 0 ? validImages : dummyData.story.images;
            })(),
          },
          services: data.AboutUsServices.map((service) => ({
            id: `private-car`,
            title: service.title_en,
            description: service.content_en,
            location: service.location,
            icon: service.icon,
          })),
          operationalSchedule: {
            title: "Operational Hours", // Anda bisa menyesuaikan ini
            description:
              "We are committed to providing excellent service during our operational hours.", // Anda bisa menyesuaikan ini
            schedule: data.AboutUsOperational,
            buttonText: "Contact Us Now", // Anda bisa menyesuaikan ini
            buttonLink: "/contact", // Anda bisa menyesuaikan ini
          },
          achievements: {
            title: "Our Achievements", // Anda bisa menyesuaikan ini
            subtitle: "Trusted by thousands of travelers across Indonesia", // Anda bisa menyesuaikan ini
            stats: data.AboutUsAchievements.map((achievement) => ({
              number: achievement.number,
              label: achievement.content_en,
              icon: achievement.icon,
            })),
          },
          cta: {
            title: data.AboutUsCta.title_en, // Anda bisa menyesuaikan ini
            description: "Book your next adventure with urbanlife!", // Anda bisa menyesuaikan ini
            buttonText: data.AboutUsCta.button_text || "Contact Us", // Dynamic Contact Us text
            buttonLink: data.AboutUsCta.button_url || "/contact", // Dynamic Contact Us link
            ctaButtonText: data.AboutUsCta.cta_button_text || "Book Now", // Dynamic Book Now text
            ctaButtonLink: data.AboutUsCta.cta_button_url || "/services", // Dynamic Book Now link
          },
        };

        setAboutData(formattedData);
      } catch (error) {
        console.error("Failed to fetch About Us data:", error);
        toast.error("Failed to load About Us data. Using fallback data.");
        setAboutData(dummyData); // Anda bisa menggunakan dummyData jika gagal
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getServiceIcon = (iconName) => {
    const icons = {
      car: <Car className="w-5 h-5" />,
      plane: <Plane className="w-5 h-5" />,
      ship: <Ship className="w-5 h-5" />,
      bike: <Bike className="w-5 h-5" />,
      calendar: <Calendar className="w-5 h-5" />,
      building: <Building className="w-5 h-5" />,
    };
    return icons[iconName] || <MapPin className="w-5 h-5" />;
  };

  const getAchievementIcon = (iconName) => {
    const icons = {
      users: <Users className="w-5 h-5" />,
      building: <Building className="w-5 h-5" />,
      car: <Car className="w-5 h-5" />,
      star: <Star className="w-5 h-5" />,
    };
    return icons[iconName] || <Award className="w-5 h-5" />;
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #82DCE9 0%, #E4F2F2 100%)",
          }}
        />
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 text-center sm:px-6 sm:py-20 mt-15">
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl text-white font-bold mb-6 leading-tight drop-shadow-md">
            {aboutData.header.title}
          </h1>
          <p className="font-inter text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {aboutData.header.tagline}
          </p>
          <div className="mt-6 w-20 h-1 bg-white/60 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div
          id="story"
          data-animate
          className={`max-w-5xl mx-auto mb-12 transition-all duration-700 ${isVisible.story
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
            }`}
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <MapPin className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                {aboutData.story.title}
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed text-base sm:text-lg">
                {aboutData.story.description}
              </p>
            </div>
            <div className="relative">
              <ModernCarousel images={aboutData.story.images} />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              Our Services
            </h3>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Comprehensive travel solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {aboutData.services.map((service) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`group bg-white border border-gray-100 rounded-xl p-6 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 ${isVisible[`service-${service.id}`]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-200/50 transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="font-inter text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <span className="font-inter text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
                      {service.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div
                id="schedule"
                data-animate
                className={`lg:w-1/2 transition-all duration-700 ${isVisible.schedule
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                  }`}
              >
                <div className="bg-white border border-gray-100 rounded-xl p-5 h-full">
                  <div className="mb-4">
                    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3">
                      {aboutData.operationalSchedule.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm">
                      {aboutData.operationalSchedule.description}
                    </p>
                  </div>
                  <div className="space-y-2 mb-4">
                    {aboutData.operationalSchedule.schedule.map(
                      ({ day, time, highlight }) => (
                        <div
                          key={day}
                          className="flex items-center justify-between py-1"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            <span className="font-inter text-gray-900 font-medium text-xs uppercase tracking-wider">
                              {day}
                            </span>
                          </div>
                          <span
                            className={`font-inter text-xs font-semibold ${highlight ? "text-red-500" : "text-gray-700"
                              }`}
                          >
                            {time}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <a
                    href={aboutData.operationalSchedule.buttonLink}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-inter font-semibold transition-colors duration-300 text-center block text-sm"
                  >
                    {aboutData.operationalSchedule.buttonText}
                  </a>
                </div>
              </div>
              <div
                id="achievements"
                data-animate
                className={`lg:w-1/2 transition-all duration-700 ${isVisible.achievements
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                  }`}
              >
                <div className="bg-white border border-gray-100 rounded-xl p-5 h-full">
                  <div className="mb-4">
                    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                      {aboutData.achievements.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm">
                      {aboutData.achievements.subtitle}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {aboutData.achievements.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center text-cyan-600">
                          {getAchievementIcon(stat.icon)}
                        </div>
                        <div className="font-playfair text-lg font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="font-inter text-xs text-gray-600 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="cta"
          data-animate
          className={`text-center max-w-4xl mx-auto transition-all duration-700 ${isVisible.cta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
            }`}
        >
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8 relative shadow-lg">
            <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
              {aboutData.cta.title}
            </h3>
            <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              {aboutData.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={aboutData.cta.ctaButtonLink}
                className="font-inter bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
                aria-label={aboutData.cta.ctaButtonText}
              >
                {aboutData.cta.ctaButtonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href={aboutData.cta.buttonLink}
                className="font-inter border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
                aria-label={aboutData.cta.buttonText}
              >
                {aboutData.cta.buttonText}
              </a>
            </div>
            <p className="font-inter text-gray-500 mt-6 text-sm">
              Experience the difference with urbanlife - your journey starts
              here
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;