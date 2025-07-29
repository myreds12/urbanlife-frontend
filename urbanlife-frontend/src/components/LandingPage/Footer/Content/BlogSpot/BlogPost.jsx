import React, { useState } from "react";
import Navbar from "../../../HomePage/Navbar/Navbar";
import './BlogPost.css';

const BlogPostPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Art Market",
    "Beach",
    "Cultural Park",
    "Dance",
    "Hot Spring",
    "Monkey Forest",
    "Rice Terraces",
    "Temple",
    "Volcano",
    "Water Palace",
    "Waterfall",
  ];

  const blogPosts = [
    {
      title: "Ubud Art Market",
      description: "time to shop for local souvenirs",
      category: "Art Market",
    },
    {
      title: "Padang Padang Beach",
      description: "a hidden beach",
      category: "Beach",
    },
    {
      title: "Garuda Wisnu Kencana Cultural Park",
      description: "a center of cultural activities",
      category: "Cultural Park",
    },
    {
      title: "Barong Dance",
      description: "a battle between good and evil",
      category: "Dance",
    },
    {
      title: "Banjar Hot Spring",
      description: "a great spot to relax",
      category: "Hot Spring",
    },
    {
      title: "Ubud Monkey Forest",
      description: "a sacred monkey forest",
      category: "Monkey Forest",
    },
    {
      title: "Jatiluwih Rice Terraces",
      description: "an introduction to Subak",
      category: "Rice Terraces",
    },
    {
      title: "Tanah Lot Temple",
      description: "a guardian snake underneath",
      category: "Temple",
    },
    {
      title: "Batur Volcano View and Lake",
      description: "hike for the sunrise",
      category: "Volcano",
    },
    {
      title: "Tirta Gangga Water Palace",
      description: "a water garden sanctuary",
      category: "Water Palace",
    },
    {
      title: "Water sports at Nusa Dua",
      description: "your holiday activities",
      category: "Beach",
    },
    {
      title: "Tegenungan Waterfall",
      description: "time to freshen up",
      category: "Waterfall",
    },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="blogpost-page">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Blog Posts</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="separator">/</span>
            <span>Blog</span>
          </div>
        </div>
      </div>

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

      <div className="content-area">
        {filteredPosts.map((post, idx) => (
          <div key={idx} className="blog-post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostPage;
