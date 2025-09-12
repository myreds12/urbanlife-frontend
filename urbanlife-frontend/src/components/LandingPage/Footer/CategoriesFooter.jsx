import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import Footer from '../HomePage/Footer';
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";
import toast from 'react-hot-toast';
import TicketCard from './TicketCard';
import './CategoriesFooter.css';

const CategoriesFooter = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mapping ikon berdasarkan kategori
  const categoryIcons = {
    "Art Market": "/images/LandingPage/Footer/iconTicket/ArtMarket.png",
    "Beach": "/images/LandingPage/Footer/iconTicket/Beach.png",
    "Cultural Park": "/images/LandingPage/Footer/iconTicket/CulturalPark.png",
    "Dance": "/images/LandingPage/Footer/iconTicket/Dance.png",
    "Hot Spring": "/images/LandingPage/Footer/iconTicket/HotSpring.png",
    "Monkey Forest": "/images/LandingPage/Footer/iconTicket/MonkeyForest.png",
    "Rice Terraces": "/images/LandingPage/Footer/iconTicket/RiceTerraces.png",
    "Temple": "/images/LandingPage/Footer/iconTicket/Temple.png",
    "Volcano": "/images/LandingPage/Footer/iconTicket/Volcano.png",
    "Water Palace": "/images/LandingPage/Footer/iconTicket/WaterPalace.png",
    "Water Sports": "/images/LandingPage/Footer/iconTicket/WaterSports.png",
    "Waterfall": "/images/LandingPage/Footer/iconTicket/Waterfall.png",
  };

  // Fetch blog data dan kategori
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/blog', {
          params: { take: 10, page: 1 },
        });
        const { data } = response.data;
        if (data && Array.isArray(data)) {
          setBlogPosts(data);
          // Ekstrak kategori unik dari blog_category.name
          const uniqueCategories = [
            'All',
            ...new Set(data.map((item) => item.blog_category?.name).filter((name) => name)),
          ];
          setCategories(uniqueCategories);
        } else {
          setBlogPosts([]);
          setCategories(['All']);
        }
      } catch (error) {
        console.error('❌ Failed to fetch blog data:', error);
        toast.error(t('blog.error_fetch'));
        setBlogPosts([]);
        setCategories(['All']);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [t]);

  // Efek mouse untuk hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Filter blog berdasarkan kategori aktif
  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.blog_category?.name === activeCategory);

  const renderCategoryContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
      );
    }

    if (filteredPosts.length === 0) {
      return (
        <div className="no-content text-center text-gray-500">
          <h2>{t('blog.no_posts')}</h2>
          <p>{t('blog.no_posts_description')}</p>
        </div>
      );
    }

    return (
      <div className="all-categories">
        {filteredPosts.map((post) => {
          const imageUrl = post.blog_file?.[0]?.url
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${post.blog_file[0].url.replace(/\\/g, "/").replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg";
          return (
            <TicketCard
              key={post.id}
              backgroundImage={imageUrl}
              title={post.blog_content[0]?.judul || "Untitled"}
              subtitle={post.blog_category?.name || "Uncategorized"}
              icon={categoryIcons[post.blog_category?.name] || "/images/LandingPage/Footer/iconTicket/default.png"}
              rightTitle={post.lokasi?.nama || "Unknown Location"}
              barcodeImage="/images/LandingPage/Footer/barcode.png"
              linkTo={`/blog/${post.slug}`}
              buttonText={'See More'}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="categories-page">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
        }}
      >
        {/* Animated Decorative Elements */}
        <div className="hero-decorations">
          <div className="floating-element diamond diamond-1"></div>
          <div className="floating-element diamond diamond-2"></div>
          <div className="floating-element diamond diamond-3"></div>
          <div className="floating-element triangle triangle-1"></div>
          <div className="floating-element triangle triangle-2"></div>
          <div className="floating-element triangle triangle-3"></div>
          <div className="floating-element hexagon hexagon-1"></div>
          <div className="floating-element hexagon hexagon-2"></div>
          <div className="floating-line line-1"></div>
          <div className="floating-line line-2"></div>
          <div className="floating-line line-3"></div>
          <div className="dots-pattern dots-1"></div>
          <div className="dots-pattern dots-2"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title playfair">{t('categories.title')}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t('services.home')}
            </button>
            <span className="separator">/</span>
            <span>{t('categories.title')}</span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-container">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderCategoryContent()}
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesFooter;