import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../../HomePage/Navbar/Navbar";
import Footer from "../../../HomePage/Footer";
import apiClient from "../../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import "./BlogPostMain.css";

const BlogPostMain = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch blog data dan kategori
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/blog", {
          params: { take: 10, page: 1 },
        });
        const { data } = response.data;
        if (data && Array.isArray(data)) {
          setBlogPosts(data);
          // Ekstrak kategori unik dari blog_category.name
          const uniqueCategories = [
            "All",
            ...new Set(data.map((item) => item.blog_category?.name).filter((name) => name)),
          ];
          setCategories(uniqueCategories);
        } else {
          setBlogPosts([]);
          setCategories(["All"]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch blog data:", error);
        toast.error(t("blog.error_fetch"));
        setBlogPosts([]);
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [t]);

  // Efek mouse untuk hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroSection.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  // Filter blog berdasarkan kategori aktif
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.blog_category?.name === activeCategory);

  return (
    <div className="blog-main-page">
      {/* Navbar */}
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
          <h1 className="hero-title playfair">{t("blog.title")}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t("services.home")}
            </button>
            <span className="separator">/</span>
            <span>{t("blog.title")}</span>
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
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
      ) : (
        <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const imageUrl = post.blog_file?.[0]?.url
                ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${post.blog_file[0].url.replace(/\\/g, "/").replace(/^uploads\//, "")}`
                : "/public/images/error/No_Image_Available.jpg";
              return (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow block"
                >
                  <img
                    src={imageUrl}
                    alt={post.blog_content[0]?.judul || "Blog Image"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString("id-ID")
                        : "Unknown Date"}
                    </p>
                    <h2 className="text-lg font-bold mt-1">
                      {post.blog_content[0]?.judul || "Untitled"}
                    </h2>
                    <p className="text-gray-700 mt-2">
                      {post.blog_content[0]?.deskripsi?.slice(0, 100) + "..." || "No description"}
                    </p>
                    <span className="text-blue-600 hover:underline mt-3 inline-block">
                      {t("blog.read_more")} →
                    </span>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {t("blog.no_posts")}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostMain;