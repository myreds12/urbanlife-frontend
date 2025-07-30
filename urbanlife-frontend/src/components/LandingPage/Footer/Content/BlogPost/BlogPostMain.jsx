import React, { useState, useEffect } from "react";
import Navbar from "../../../HomePage/Navbar/Navbar";
import Footer from "../../../HomePage/Footer";
import "./BlogPostMain.css";
import { blogPosts } from './posts/allPosts';

const BlogPostMain = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    
  const categories = ["All", "Art Market", "Beach", "Cultural Park", "Dance", "Hot Spring", "Monkey Forest", "Rice Terrace", "Temple", "Volcano", "Waterfall", "Water Palace", "Water Sport"];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="blog-main-page">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="hero-section" style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`
      }}>
        {/* Animated Decorative Elements */}
        <div className="hero-decorations">
          {/* Floating Diamonds */}
          <div className="floating-element diamond diamond-1"></div>
          <div className="floating-element diamond diamond-2"></div>
          <div className="floating-element diamond diamond-3"></div>
          
          {/* Floating Triangles */}
          <div className="floating-element triangle triangle-1"></div>
          <div className="floating-element triangle triangle-2"></div>
          <div className="floating-element triangle triangle-3"></div>
          
          {/* Floating Hexagons */}
          <div className="floating-element hexagon hexagon-1"></div>
          <div className="floating-element hexagon hexagon-2"></div>
          
          {/* Floating Lines */}
          <div className="floating-line line-1"></div>
          <div className="floating-line line-2"></div>
          <div className="floating-line line-3"></div>
          
          {/* Floating Dots Pattern */}
          <div className="dots-pattern dots-1"></div>
          <div className="dots-pattern dots-2"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title playfair">Blog</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="separator">/</span>
            <span>Blog</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="categories-container">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog List */}
      <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredPosts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="blog-card shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow block"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">{post.date}</p>
              <h2 className="text-lg font-bold mt-1">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.excerpt}</p>
              <span className="text-blue-600 hover:underline mt-3 inline-block">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostMain;
